require('dotenv').config()
const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
  try {
    let token = req.headers.token
    let user = jwt.verify(token, process.env.SECRET)
    req.user = user
    next()
  } catch (error) {
    next({
      status: 401,
      msg: 'Invalid Token!'
    })
  }
}

module.exports = authentication