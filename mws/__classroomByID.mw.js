const ClassroomMongoModel = require("../managers/entities/classroom/Classroom.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const id = req.body.id;
    const classroom = await ClassroomMongoModel.findOne({ _id: id })
      .populate("schoolID")
      .lean()
      .catch(console.log);
    if (!classroom)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 400,
        errors: [{ message: "classroom is not found" }],
      });
    console.log(classroom.schoolID._id.toString());
    console.log(req.user.schoolID.toString());
    if (!req.user.schoolID.equals(classroom.schoolID._id))
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: [{ message: "you don't have access to this classroom" }],
      });
    next(classroom);
  };
};
