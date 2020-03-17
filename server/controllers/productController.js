'use strict'
const { Product } = require('../models')

class ProductController {
  static getAll(req, res, next) {
    Product
      .findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static getOne(req, res, next) {
    Product
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: "Product not found."
          }
        } else if (data) {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static create(req, res, next) {
    const { name, stock, urlImage, price } = req.body
    Product
      .create({
        name,
        stock,
        urlImage,
        price,
        UserId: req.user.id
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }
  static destroy(req, res, next) {
    const id = req.params.id
    Product
      .destroy({
        where: {
          id: id
        }
      })
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: 'No data found!'
          }
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
  static update(req, res, next) {
    const { name, stock, urlImage, price } = req.body
    Product
      .update({
        name,
        stock,
        urlImage,
        price,
      },
        {
          where: {
            id: req.params.id
          }, returning: true
        }
      )
      .then(data => {
        if (!data) {
          throw {
            status: 404,
            msg: 'No data found!'
          }
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ProductController