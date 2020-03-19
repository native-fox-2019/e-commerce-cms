let { User } = require("../models");
const createError = require("http-errors");
module.exports = {
  authorization(req, res, next) {
    try {
      if (req.user.role === "admin") {
        next();
      } else {
        throw createError(403, "Forbidden access role not admin.");
      }
    } catch (error) {
      next(error);
    }
  },
  admin(req, res, next) {
    try {
      if (req.user.role === "superadmin") {
        next();
      } else {
        throw createError(
          403,
          "Forbiden access you're unauthorize to register"
        );
      }
    } catch (error) {
      next(error);
    }
  }
};
