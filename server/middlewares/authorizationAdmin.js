'use strict'
const { User } = require('../models')

function authorization(req, res, next) {
  User
    .findOne({
      where: {
        id: req.user.id
      }
    })
    .then(data => {
      if (!data) {
        throw {
          status: 404,
          msg: "Invalid Token!"
        }
      } else {
        if (data.admin == false) {
          throw {
            status: 401,
            msg: "Don't have access!"
          }
        } else if (data.admin == true) {
          next()
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization