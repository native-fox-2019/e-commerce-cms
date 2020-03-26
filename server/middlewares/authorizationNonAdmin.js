"use strict"
const { User } = require('../models')

function authorizationNonAdmin(req, res, next) {
  User
    .findOne({
      where: {
        id: req.user.id
      }
    })
    .then(data => {
      if (data.admin == false) {
        next()
      } else {
        throw {
          status: 401,
          msg: "Unauthorized!"
        }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorizationNonAdmin