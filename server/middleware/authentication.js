const {User} = require('../models/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()

function authentication (request,response,next){
    const token = request.headers.token
    try{
        let decoded = jwt.verify(token,process.env.SECRET)
         request.authenticationData=decoded
         next()
    }catch(err){
        next(err)
    }
}

module.exports = authentication