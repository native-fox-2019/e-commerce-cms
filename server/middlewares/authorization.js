const { User } = require('../models')

const authorization = (req, res, next) => {
    if (req.userData.role === 'admin') {
        next()
    } else {
        next(
            {
                status: 403,
                message: "You are not authorized"
            }
        )
    }
}

module.exports = authorization