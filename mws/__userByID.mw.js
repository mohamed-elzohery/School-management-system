const User = require("../managers/entities/user/User.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const id = req.body.id;
    const user = await User.findOne({ _id: id }).lean().catch(console.log);
    if (!user)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 400,
        errors: "user is not found",
      });
    next(user);
  };
};
