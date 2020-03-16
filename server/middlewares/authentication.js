const token= require('jsonwebtoken')
const {verify} = require('../helpers/jwt')

module.exports = function authentication(req,res,next){
    try {
        req.user = verify(access_token, proces.env.JWT_SECRET)
        next()
    } catch (error) {
        next(error)
    }
}