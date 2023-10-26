const StudentMongoModel = require("../managers/entities/student/Student.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const id = req.body.id;
    const student = await StudentMongoModel.findOne({ _id: id })
      .populate("schoolID")
      .populate("classroomID")
      .lean()
      .catch(console.log);
    if (!student)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 400,
        errors: "student is not found",
      });
    if (!req.user.schoolID.equals(student.schoolID._id))
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "you don't have authority over this student",
      });

    req.student = student;
    next(student);
  };
};
