const { verify } = require('../helpers/token')

module.exports = async (req, res, next) => {
    try {
        const authenticate = await verify(req.headers.access_token)
        req.userData = authenticate
        next()
    } catch (error) {
        res.status(404).json(error)
    }
}