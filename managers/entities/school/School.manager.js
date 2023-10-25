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

  async createSchool({ title, __superAdmin, description, address }) {
    const school = {
      title,
      address,
      description,
    };

    // Data validation
    let result = await this.validators.school.createSchool(school);
    if (result) return { errors: result };

    // Creation Logic
    const createdSchool = await this.mongomodels.School.create(school);

    // Response
    return {
      school: createdSchool,
    };
  }

  async deleteSchool({ __superAdmin, __schoolByID }) {
    await this.mongomodels.School.deleteOne(__schoolByID);
    // Response
    return {
      message: "school is deleted successfully",
    };
  }

  async updateSchool({
    title,
    __superAdmin,
    __schoolByID,
    description,
    address,
  }) {
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
          description,
          address,
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
    return {
      school: __schoolByID,
    };
  }
};
