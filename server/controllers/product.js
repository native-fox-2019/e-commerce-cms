const { Product, User, Category } = require('../models')
const createError = require('http-errors')

class ControllerProduct {
  static addProduct(req, res, next) {
    let { name, image_url, price, stock, CategoryId } = req.body
    let UserId = req.user.id
    Product
      .create({ name, image_url, price, stock, CategoryId, UserId })
      .then(result => {
        // console.log(result)
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })

  }

  static getAllProduct(req, res, next) {
    Product
      .findAll(
        {
          include: [
            { model: Category }
          ],
          order: [
            ['updatedAt', 'DESC']
          ]
        }
      )
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static getOneProduct(req, res, next) {
    let id = req.params.id
    Product
      .findOne({ where: { id } })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateProduct(req, res, next) {
    let id = req.params.id
    let { name, image_url, price, stock, CategoryId } = req.body
    Product
      .update({ name, image_url, price, stock, CategoryId }, { where: { id }, returning: true })
      .then(result => {
        res.status(200).json(result[1][0])
      })
      .catch(err => {
        next(err)
      })

  }

  static deleteProduct(req, res, next) {
    let id = req.params.id
    let tmp = null
    Product
      .findOne({ where: { id } })
      .then(result => {
        tmp = result
        return Product.destroy({ where: { id }, returning: true })
      })
      .then(resultDestroy => {
        if (resultDestroy > 0) {
          res.status(200).json(tmp)
        } else {
          throw createError(404, 'not found')
        }
      })
      .catch(err => {
        next(err)
      })

  }

}

module.exports = ControllerProduct