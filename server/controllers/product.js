const { Product } = require("../models");
const createError = require("http-errors");

class Controller {
  static async get(req, res, next) {
    try {
      let show = await Product.findAll();
      res.status(200).json(show);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let found = await Product.findOne(condition);
      if (found) {
        res.status(200).json(found);
      } else {
        throw createError(404, "Product not found !");
      }
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      let created = await Product.create(req.body);
      res
        .status(200)
        .json({ Message: "Product created succesfully.", Data: created });
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
      let deleted = await Product.destroy(condition);
      res.status(200).json({ Message: "Successfully deleted product." });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      let condition = {
        where: {
          id: req.params.id
        }
      };
      let findOne = await Product.findOne(condition);
      if (findOne) {
        let updated = await Product.update(req.body, condition);
        res
          .status(200)
          .json({ Message: "Successfully updated product", Data: req.body });
      } else {
        throw createError(404);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
