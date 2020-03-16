const {verifyToken} = require('../helpers/jsonwebtoken.js')

function authentication(req, res, next) {
    try {
        let decoded = verifyToken(req.headers.token)
        req.userData = decoded
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = authentication