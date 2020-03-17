const { Admin } = require('../models/index.js')

function authorization(req,res,next){
    Admin.findOne({where:{email:req.userData.email}})
    .then(result=>{
        console.log(result.roles, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        if(result.roles === 'admin'){
        console.log(result.roles)
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