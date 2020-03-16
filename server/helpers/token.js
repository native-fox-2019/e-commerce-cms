const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET

const create = (data) => {
    return jwt.sign(data, secret)
}

const verify = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    create,
    verify
}