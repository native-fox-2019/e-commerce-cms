require('dotenv').config()
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function sign (obj) {
    console.log('456')
    return jwt.sign(obj, secret)
}

function verify (access_token) {
    return jwt.verify(access_token, secret)
}

module.exports = { sign, verify }