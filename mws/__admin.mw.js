const Roles = require("../config/constants/Roles");
const User = require("../managers/entities/user/User.mongoModel");

module.exports = ({ meta, config, managers }) => {
  return async ({ req, res, next }) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "unauthorized: token is invalid",
      });
    }
    let decodedToken = managers.token.verifyLongToken({
      token: req.headers.token,
    });
    if (!decodedToken) {
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "unauthorized operation",
      });
    }
    let user = await User.findById(decodedToken.userId);
    if (!user)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "unauthorized operation",
      });
    if (user.role !== Roles.SCHOOL_ADMIN)
      return managers.responseDispatcher.dispatch(res, {
        ok: false,
        code: 401,
        errors: "unauthorized operation",
      });
    next(user);
  };
};
