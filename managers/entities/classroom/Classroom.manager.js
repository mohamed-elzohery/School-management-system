module.exports = class Classroom {
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
    this.classroomsCollection = "classrooms";
    this.httpExposed = [
      "createClassroom",
      "delete=deleteClassroom",
      "put=updateClassroom",
      "get=getClassroomById",
      "get=getAllClassrooms",
    ];
  }

  async createClassroom({ title, __admin, status }) {
    const classroom = {
      title,
      status,
    };
    // Data validation
    let result = await this.validators.classroom.createClassroom(classroom);
    if (result) return { errors: result };

    // Creation Logic

    const createdClassroom = await this.mongomodels.Classroom.create({
      ...classroom,
      schoolID: __admin.schoolID,
    });

    // Response
    return {
      classroom: createdClassroom,
    };
  }

  async deleteClassroom({ __admin, __classroomByID }) {
    await this.mongomodels.Classroom.deleteOne(__classroomByID);
    // Response
    return {
      message: "classroom is deleted successfully",
    };
  }

  async updateClassroom({ title, status, __admin, __classroomByID }) {
    // Data validation
    let result = await this.validators.classroom.updateClassroom({
      title,
      status,
    });
    if (result) return { errors: result };

    // Update Logic
    await this.mongomodels.Classroom.updateOne(
      {
        ...__classroomByID,
      },
      {
        $set: {
          title,
          status,
        },
      },
      {
        new: true,
      }
    );
    // Response
    return "classroom is updated successfully";
  }

  async getAllClassrooms({ __admin }) {
    return this.mongomodels.Classroom.find({ schoolID: __admin.schoolID });
  }

  async getClassroomById({ __admin, __classroomByID }) {
    return {
      classroom: __classroomByID,
    };
  }
};
