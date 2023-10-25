module.exports = class School {
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
    this.schoolsCollection = "schools";
    this.httpExposed = [
      "createSchool",
      "delete=deleteSchool",
      "put=updateSchool",
      "get=getSchoolById",
      "get=getAllSchools",
    ];
  }

  async createSchool({ title, __superAdmin }) {
    const school = {
      title,
    };

    // Data validation
    let result = await this.validators.school.createSchool(school);
    if (result) return { errors: result };

    // Creation Logic
    await this.mongomodels.School.create(school);

    // Response
    return {
      school,
    };
  }

  async deleteSchool({ __superAdmin, __schoolByID }) {
    await this.mongomodels.School.deleteOne(__schoolByID);
    // Response
    return {
      message: "school is deleted successfully",
    };
  }

  async updateSchool({ title, __superAdmin, __schoolByID }) {
    // Data validation
    let result = await this.validators.school.updateSchool(__schoolByID);
    if (result) return { errors: result };

    // Update Logic
    await this.mongomodels.School.updateOne(
      {
        ...__schoolByID,
      },
      {
        $set: {
          title,
        },
      },
      {
        new: true,
      }
    );
    // Response
    return "school is updated successfully";
  }

  async getAllSchools({ __superAdmin }) {
    return this.mongomodels.School.find();
  }

  async getSchoolById({ __superAdmin, __schoolByID }) {
    delete __schoolByID.password;
    return {
      school: __schoolByID,
    };
  }
};
