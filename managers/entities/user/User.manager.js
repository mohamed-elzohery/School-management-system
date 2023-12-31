const Roles = require("../../../config/constants/Roles");

module.exports = class User {
  constructor({
    utils,
    cache,
    config,
    cortex,
    managers,
    validators,
    mongomodels,
  } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.managers = managers;
    this.tokenManager = managers.token;
    this.usersCollection = "users";
    this.userExposed = ["createUser"];
    this.httpExposed = [
      "createUser",
      "login",
      "delete=deleteUser",
      "put=updateUser",
      "get=getUserById",
      "get=getAllUsers",
    ];

    this._preload();
  }

  async _preload() {
    await this._upsertSuperAdmin();
  }

  async login({ password, __userRegistered }) {
    const isInvalidCredentials = !(__userRegistered.email && password);

    if (
      isInvalidCredentials ||
      !(await __userRegistered.isPasswordMatched(password))
    )
      return {
        errors: [
          {
            message: "email or password is wrong.",
            path: "login",
            label: "login",
            log: "_credentials",
          },
        ],
      };

    let token = this.tokenManager.genLongToken({
      userId: __userRegistered._id,
      user: __userRegistered,
    });
    const { email, role, _id, schoolID } = __userRegistered;
    return {
      user: { email, role, _id, schoolID },
      token,
    };
  }

  async createUser({
    username,
    email,
    password,
    __userRegistered,
    schoolID,
    __superAdmin,
  }) {
    if (__userRegistered.email)
      return {
        errors: [
          {
            message: "email is already registered",
            path: "email",
            label: "email",
            log: "_duplicate",
          },
        ],
      };

    const user = {
      username,
      email,
      password,
      schoolID,
    };

    // Data validation
    let result = await this.validators.user.createUser(user);
    if (result) return { errors: result };

    const school = await this.mongomodels.School.findOne({ _id: schoolID })
      .lean()
      .catch(console.log);
    if (!school)
      return {
        errors: [
          {
            message: "no school is found of this schoolID",
            path: "schholID",
            label: "schholID",
            log: "_duplicate",
          },
        ],
      };

    // Creation Logic
    const createdUser = await this.mongomodels.User.create(user);
    let longToken = this.tokenManager.genLongToken({
      userId: createdUser._id,
      user,
    });

    // Response
    return {
      user: { username, email },
      longToken,
    };
  }

  async deleteUser({ __superAdmin, __userByID }) {
    await this.mongomodels.User.deleteOne(__userByID);
    // Response
    return {
      message: "user is deleted successfully",
    };
  }

  async updateUser({
    username,
    email,
    password,
    schoolID,
    __superAdmin,
    __userRegistered,
    __userByID,
  }) {
    if (__userRegistered.email)
      return {
        errors: [
          {
            message: "this email is taken by another user",
            path: "email",
            label: "email",
            log: "_duplicate",
          },
        ],
      };

    // Data validation
    let result = await this.validators.user.updateUser(__userByID);
    if (result) return { errors: result };

    // Update Logic
    await this.mongomodels.User.updateOne(
      {
        ...__userByID,
      },
      {
        $set: {
          password,
          email,
          username,
          schoolID,
        },
      },
      {
        new: true,
      }
    );
    // Response
    return "user is updated successfully";
  }

  async getAllUsers({ __superAdmin }) {
    return this.mongomodels.User.find(
      { role: Roles.SCHOOL_ADMIN },
      { password: 0 }
    );
  }

  async getUserById({ __superAdmin, __userByID }) {
    delete __userByID.password;
    return {
      user: __userByID,
    };
  }

  async _upsertSuperAdmin() {
    await this.mongomodels.User.updateOne(
      {
        email: this.config.dotEnv.SUPER_ADMIN_EMAIL,
      },
      {
        $set: {
          password: this.config.dotEnv.SUPER_ADMIN_PASSWORD,
          role: Roles.SUPER_ADMIN,
        },
      },
      {
        upsert: true,
      }
    );
  }
};
