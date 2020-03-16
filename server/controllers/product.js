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
      let input = {
        name: req.body.name,
        image_url: req.body.image_url,
        price: req.body.price,
        stock: req.body.stock
      };
      let created = await Product.create(input);
      res
        .status(200)
        .json({ Message: "Product created succesfully.", Data: created });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
