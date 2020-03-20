const { Admin } = require('../models/index.js')

function authorization(req,res,next){
    Admin.findOne({where:{email:req.userData.email}})
    .then(result=>{
        if(result.roles === 'admin'){
        next()
    } else{
        next({status: 401, msg: 'you are not authorized!'})
      }
    })
    .catch(err=>{
        next({status: 501, msg: 'Internal server error!'})
    })

}

module.exports = authorization