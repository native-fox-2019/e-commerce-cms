require('dotenv').config()
const token= require('jsonwebtoken')
const {verify} = require('../helpers/jwt')

module.exports = function authentication(req,res,next){
    try {
        // console.log(verify(access_token))
        req.user = verify(req.headers.access_token)
        console.log('verify token')
        next()
    } catch (error) {
        console.log('authentication error')
        err = {
            status:401,
            msg: 'Invalid Token'
        }
        next(err)
    }
}