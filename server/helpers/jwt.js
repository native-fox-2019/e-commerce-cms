const jwt = require('jsonwebtoken')

const generateToken = data => {
    return jwt.sign(data, process.env.JWT_SECRET)
}

const verifyToken = access_token => {
    return jwt.verify(access_token, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }