const { Product, User, Category } = require('../models')

class ControllerCategory {

  static categoryAll(req, res, next) {
    Category
      .findAll()
      .then(resCategory => {
        res.status(200).json(resCategory)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static categoryAdd(req, res, next) {
    let { name } = req.body
    Category
      .create({
        name
      })
      .then(resCreate => {
        res.status(200).json(resCreate)
      })
      .catch(err => {
        console.log(err)
      })
  }

}

module.exports = ControllerCategory