"use strict"
const { Transaction } = require('../models')

function authorizationOwner(req, res, next) {
  Transaction
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      if (data.UserId === req.user.id) {
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

module.exports = authorizationOwner