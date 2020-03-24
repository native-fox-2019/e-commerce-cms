const jwt = require('jsonwebtoken')
const customError = require('http-errors')
const { User } = require('../models')

module.exports = {
    authentication: async (req, res, next) => {
        try {
            if (!req.headers.access_token) throw customError(401)

            let decoded = await jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
            if (!decoded) throw customError(500, 'Failed to verify access token! Please try again or log in first.')

            let matchUser = await User.findOne({ where: { id: decoded.id } })
            if (!matchUser) throw customError(401)

            req.userData = decoded
            next()
        } catch (err) {
            next(err)
        }
    },
    authorizationUser: async (req, res, next) => {
        try {
            let userId = req.userData.id
            let matchUser = await User.findOne({ where: { id: userId } })
            if (matchUser.role !== 'user' && matchUser.role !== 'admin' && matchUser.role !== 'superadmin') throw customError(403)
            next()
        } catch (err) {
            next(err)
        }
    },
    authorizationAdmin: async (req, res, next) => {
        try {
            let userId = req.userData.id
            let matchUser = await User.findOne({ where: { id: userId } })
            if (matchUser.role !== 'admin' && matchUser.role !== 'superadmin') throw customError(403)
            next()
        } catch (err) {
            next(err)
        }
    },
    authorizationSuperAdmin: async (req, res, next) => {
        try {
            let userId = req.userData.id
            let matchUser = await User.findOne({ where: { id: userId } })
            if (matchUser.role !== 'superadmin') throw customError(403)
            next()
        } catch (err) {
            next(err)
        }
    }
}