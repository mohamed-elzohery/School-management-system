const SchoolMongoModel = require("../managers/entities/school/School.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const id = req.body.id;
    const school = await SchoolMongoModel.findOne({ _id: id })
      .lean()
      .catch(console.log);
    if (!school)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 400,
        errors: "school is not found",
      });
    next(school);
  };
};
