const { verifyToken } = require('../helpers/jwt')

const authentication = (req, res, next) => {
    try {
        let { access_token } = req.headers
        req.userData = verifyToken(access_token)
        next()
    } catch (err) {
        next(
            {
                status: 403,
                message: "You need to login first"
            }
        )
    }
}

module.exports = authentication