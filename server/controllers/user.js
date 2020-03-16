const { User } = require("../models");
const { sign } = require("../helpers/jwt");
const { compare } = require("../helpers/bcrypt");
const createError = require("http-errors");

class Controller {
  static async login(req, res, next) {
    try {
      let condition = {
        where: {
          email: req.body.email
        }
      };
      let { id, email, password, role, name } = await User.findOne(condition);
      if (compare(req.body.password, password)) {
        let access_token = sign({ id, email, role });
        res.status(200).send({ access_token, name });
      } else {
        throw createError(400, "Invalid User Password");
      }
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      let { id, email, role, name } = await User.create(req.body);
      let access_token = sign({ id, email, role });
      res
        .status(201)
        .send({ Message: "Successfully create user", access_token, name });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
