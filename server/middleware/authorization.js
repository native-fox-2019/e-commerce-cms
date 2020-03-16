const { User } = require('../models/index.js')

function authorization(req,res,next){
    if(req.userData.roles === "admin"){
        next()
    } else{
        next({status: 401, msg: 'you are not authorized!'})
    }
}

module.exports = authorization