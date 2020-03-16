const {User} = require('../models')

module.exports= function authorization(req,res,next){
    const {role, id} = req.user
    User.findOne({where:{id}})
    .then(data=>{
        if(role === data.role){
            next()
        } else{
            throw {
                status:401,
                msg:'Invalid Token'
            }
        }
    })
    .catch(err =>{
        next(err)
    })
}