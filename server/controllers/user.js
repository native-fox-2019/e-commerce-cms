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
      let input = {
        image: req.body.file,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      };
      let { id, email, role, name } = await User.create(input);
      let access_token = sign({ id, email, role });
      res
        .status(201)
        .send({ Message: "Successfully create user", access_token, name });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      let data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async getOne(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let found = await User.findOne(condition);
      if (found) {
        res.status(200).json(found);
      } else {
        throw createError(404, "User not found !");
      }
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let deleted = await User.destroy(condition);
      res.status(200).json({ Message: "User deleted succesfully" });
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        },
        individualHooks: true
      };
      let input = {
        image: req.body.file !== "null" ? req.body.file : req.body.image,
        name: req.body.name,
        email: req.body.email,
        password:
          req.body.password !== "null"
            ? req.body.password
            : req.body.oldPassword
      };
      let findOne = await User.findOne(condition);
      if (findOne) {
        let updated = await User.update(input, condition);
        res.status(200).json({ Message: "User updated succesfully" });
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
