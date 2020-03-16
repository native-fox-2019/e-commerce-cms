'use strict'
const { Product } = require('../models')

function authorization(req, res, next) {
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
          msg: "Data not found!"
        }
      } else {
        if (data.UserId !== req.user.id) {
          throw {
            status: 401,
            msg: "Don't have access!"
          }
        } else if (data.UserId == req.user.id) {
          next()
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization