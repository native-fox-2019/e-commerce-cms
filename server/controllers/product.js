'use strict'
const { Product, Category } = require('../models')

class Controller{
  static findAll(req, res, next) {
    Product
      .findAll({
        include: [Category]
      })
      .then(data => {
        if (!data) {
          throw{status: 404, message: "Data Not Found"}
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
    })
  }
  static findOne(req, res, next) {
    const { id } = req.params
    Product
      .findOne({
        include: [Category],
        where: {
          id
        }
      })
      .then(data => {
      if (!data) {
        throw { status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json(data)
      }
      })
      .catch(err => {
      next(err)
    })
  }
  static create(req, res, next) {
    const { name, image_url, price, stock, description, CategoryId } = req.body
    console.log(req.body)
    Product
      .create({
        name,
        image_url,
        price,
        stock,
        description,
        CategoryId
      })
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
    })
  }
  static update(req, res, next) {
    const { id } = req.params
    const { name, image_url, price, stock, description, CategoryId } = req.body
    Product
      .update({
        name,
        image_url,
        price,
        stock,
        description,
        CategoryId
      }, {
          where: { id },
          returning: true
      })
      .then(data => {
        if (data[0] === 0) {
          throw {status : 404, message: "Data Not Found"}
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        next(err)
    })
  }
  static destroy(req, res, next) {
    const { id } = req.params
    Product
      .destroy({
      where: {id}
      })
      .then(data => {
      if (!data) {
        throw {status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json("Data Product Hasbeen Removed")
      }
      })
      .catch(err => {
      next(err)
    })
  }
}

module.exports = Controller