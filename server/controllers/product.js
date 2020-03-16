const { Product, User, Category } = require('../models')

class ControllerProduct {
  static addProduct(req, res, next) {
    let { name, image_url, price, stock } = req.body
    Product
      .create({ name, image_url, price, stock })
      .then(res => {
        console.log(res, '<<<<<<<<res ?????')
        res.status(201).json(res)
      })
      .catch(err => {
        next(err)
      })

  }

  static getAllProduct(req, res, next) {

  }

  static getOneProduct(req, res, next) {

  }

  static updateProduct(req, res, next) {

  }

  static deleteProduct(req, res, next) {

  }

}

module.exports = ControllerProduct