const model = require(`../models`);
const createError = require(`../helpers/createErrors`);
const jwt = require(`../helpers/jwt`);

class productController {
  static create(req, res, next) {
    var { name, image_url, price, stock } = req.body;

    var UserId = req.user.id

    model.Product.create({
      name,
      image_url,
      price,
      stock,
      UserId
    })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(next);
  }

  static read(req, res, next) {

    model.Product.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  }

  static update(req, res, next) {
    var { name, image_url, price, stock } = req.body;

    model.Product.update(
      {
        name,
        image_url,
        price,
        stock
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(data => {
        if (data) {
          res.status(200).json(data);
        } else {
          throw createError(404, `Item of id ${req.params.id} not found`);
        }
      })
      .catch(next);
  }

  static delete(req, res, next) {
    model.Product.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        if (data) {
          res.status(200).json(data);
        } else {
          throw createError(404, `Item of id ${req.params.id} not found`);
        }
      })
      .catch(next);
  }

  static getOne(req, res, next) {
    model.Product.findByPk(Number(req.params.id))
      .then(data => {
        if (data) {
          res.status(200).json(data);
        } else {
          throw createError(404, `Item of id ${req.params.id} not found`);
        }
      })
      .catch(next);
  }
}

module.exports = productController;
