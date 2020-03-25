const { Product, User } = require("../models");
const createError = require("http-errors");

class Controller {
  static async get(req, res, next) {
    try {
      let condition = {
        include: User
      };
      let show = await Product.findAll(condition);
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
      let input = {
        name: req.body.name,
        category: req.body.category,
        image_url: req.body.file || null,
        price: req.body.price,
        stock: req.body.stock,
        UserId: req.user.id
      };
      let created = await Product.create(input);
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
      let input = {
        name: req.body.name,
        category: req.body.category,
        image_url:
          req.body.file !== "null" ? req.body.file : req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      };
      let findOne = await Product.findOne(condition);
      if (findOne) {
        let updated = await Product.update(input, condition);
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
