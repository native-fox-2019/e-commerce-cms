const {User} = require('../models')

module.exports= function authorization(req,res,next){
    const {role, id} = req.user
    User.findOne({where:{id}})
    .then(data=>{
        console.log('author')
        if(role === data.role){
        console.log('lolos author')
        next()
        } else{
        console.log('author error')
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