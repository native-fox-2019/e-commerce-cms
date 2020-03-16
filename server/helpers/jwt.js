require('dotenv').config()
const jwt = require('jsonwebtoken')

function sign(obj) {
    return jwt.sign(obj, process.env.JWT_SECRET)
}

function verify(access_token) {
    return jwt.verify(access_token, process.env.JWT_SECRET)
}
module.exports = { sign, verify }