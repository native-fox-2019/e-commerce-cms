const jwt = require('jsonwebtoken')
const {
    User
} = require('../models')
require('dotenv').config()

module.exports = (request, response, next) => {
    let token = request.headers.access_token
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET)
        User.findOne({
                where: {
                    email: payload.email
                }
            })
            .then(result => {
                if (result) {
                    request.userData = {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        is_admin: result.is_admin,
                        superUser: result.superUser
                    }
                    next()
                } else {
                    next({
                        status_code: 403,
                        message: 'Unauthenticated'
                    })
                }
            })
            .catch(err => {
                next(err)
            })
    } catch (err) {
        next(err)
    }
}