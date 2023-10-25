const User = require("../managers/entities/user/User.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    const email = req.body.email;
    if (!email) return next();
    const userRegistered = await User.findOne({ email });
    next(userRegistered);
  };
};
