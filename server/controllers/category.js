'use strict'
const { Category } = require('../models')

class Controller{
  static findAll(req, res, next) {
    Category
      .findAll()
      .then(data => {
        if (!data) {
          throw {status: 404, message: "Data Not Found"}
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
    Category
      .findOne({
          where:{id: id}
      })
      .then(data => {
        if (!data) {
          throw {status: 200, message: "Data Not Found"}
        } else {
          res.status(200).json(data)
        }
      })
      .catch(err => {
        next(err)
    })
  }
  static create(req, res, next) {
    const { name } = req.body
    Category
      .create({
      name
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
    const { name } = req.body
    Category
      .update({
        name
      },
        {
          where: { id },
          returning: true
        }
    )
      .then(data => {
        console.log(data)
        if (data[0] === 0) {
          throw {status : 404, message: "Data Not Found"}
        } else {
          res.status(200).json(data[1][0])
        }
      })
      .catch(err => {
        console.log('masuk catch')

        next(err)
    })
  }
  static destroy(req, res, next) {
    const { id } = req.params
    Category
      .destroy({ where: {id} })
      .then(data => {
        if (!data) {
          throw{status: 404, message: "Data Not Found"}
        } else {
          res.status(200).json("Category hasbeen removed")
        }
      })
      .catch(err => {
        next(err)
    })
  }
}

module.exports = Controller