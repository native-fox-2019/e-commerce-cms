let { User } = require("../models");
const createError = require("http-errors");
module.exports = {
  authorization(req, res, next) {
    try {
      if (req.user.role === "admin" || req.user.role === "superadmin") {
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
  },
  async user(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let user = await User.findOne(condition);
      if (user) {
        if (user.id === req.user.id) {
          next();
        } else {
          throw createError(
            403,
            "Forbiden access you're unauthorize to register"
          );
        }
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
};
