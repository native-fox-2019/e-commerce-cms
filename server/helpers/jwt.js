const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const generatingJWT = payload => {
  return jwt.sign(payload, secret)
}

const veryfingJWT = token => {
  return jwt.verify(token, secret)
}

module.exports = { generatingJWT, veryfingJWT }