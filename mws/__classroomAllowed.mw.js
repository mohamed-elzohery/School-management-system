const ClassroomMongoModel = require("../managers/entities/classroom/Classroom.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const id = req.body.classroomID;
    if (!id) return next();
    const classroom = await ClassroomMongoModel.findOne({ _id: id })
      .lean()
      .catch(console.log);
    if (!classroom)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 400,
        errors: [{ message: "classroom is not found" }],
      });

    if (!req.user.schoolID.equals(classroom.schoolID))
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: [
          { message: "you are not authorized add student to this classroom." },
        ],
      });
    next(classroom);
  };
};
