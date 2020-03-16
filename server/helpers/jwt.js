const jwt = require('jsonwebtoken')

function sign(obj, pass) {
    return jwt.sign(obj, pass)
}

function verify(access_token, pass) {
    return jwt.verify(access_token, pass)
}
module.exports = { sign, verify }