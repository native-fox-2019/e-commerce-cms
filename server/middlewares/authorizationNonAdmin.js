"use strict"
const { Product } = require('../models')

function authorizationNonAdmin(req, res, next) {
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
        if (data && data.UserId == req.user.id) {
          next()
        } else if (data && data.admin == true) {
          next()
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorizationNonAdmin