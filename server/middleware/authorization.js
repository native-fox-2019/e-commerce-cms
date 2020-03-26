const {User} = require('../models/index')
const jwt = require('jsonwebtoken')

function authorization (request,response,next){
    if(request.authenticationData.level==='admin'){
        next()
    }else{
        let error={
            status:403,
            msg:"user doesn't have valid credential"
        }
        next(error)
    }
}

module.exports = authorization