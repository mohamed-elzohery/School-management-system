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

    return {
      token,
    };
  }

  async createUser({
    username,
    email,
    password,
    __userRegistered,
    school,
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
      role: Roles.SCHOOL_ADMIN,
      school,
    };

    // Data validation
    let result = await this.validators.user.createUser(user);
    if (result) return { errors: result };

    // Creation Logic
    await this.mongomodels.User.create(user);
    let longToken = this.tokenManager.genLongToken({
      userId: user._id,
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
    school,
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
          school,
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

  async getUserById({ id, __superAdmin, __userByID }) {
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

  //   _handleUserNotFound(user = null){
  //     if(!user) return { errors: [{ message: "user not found" }] };
  //   }
};
