module.exports = class Student {
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
    this.studentsCollection = "students";
    this.httpExposed = [
      "createStudent",
      "delete=deleteStudent",
      "put=updateStudent",
      "get=getStudentById",
      "get=getAllStudents",
    ];
  }

  async createStudent({ name, __admin, __classroomAllowed }) {
    const student = {
      name,
      classroomID: __classroomAllowed ? __classroomAllowed._id : undefined,
    };
    // Data validation
    let result = await this.validators.student.createStudent(student);
    if (result) return { errors: result };

    // Creation Logic

    const createdStudent = await this.mongomodels.Student.create({
      ...student,
      schoolID: __admin.schoolID,
    });

    // Response
    return {
      student: createdStudent,
    };
  }

  async deleteStudent({ __admin, __studentByID }) {
    await this.mongomodels.Student.deleteOne(__studentByID);
    // Response
    return {
      message: "student is deleted successfully",
    };
  }

  async updateStudent({ name, __admin, __studentByID, __classroomAllowed }) {
    const classroomID = __classroomAllowed ? __classroomAllowed._id : undefined;
    const updatedStudent = {
      name,
      classroomID,
    };
    // Data validation
    let result = await this.validators.student.updateStudent(updatedStudent);
    if (result) return { errors: result };

    // Update Logic
    await this.mongomodels.Student.updateOne(
      {
        ...__studentByID,
      },
      {
        $set: {
          name,
          classroomID,
        },
      },
      {
        new: true,
      }
    );
    // Response
    return "student is updated successfully";
  }

  async getAllStudents({ __admin }) {
    return this.mongomodels.Student.find({ schoolID: __admin.schoolID });
  }

  async getStudentById({ __admin, __studentByID }) {
    return {
      student: __studentByID,
    };
  }
};
