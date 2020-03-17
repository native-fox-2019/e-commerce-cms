const jwt = require('../helpers/jwt')
const { users, products } = require('../models')

module.exports=(req,res,next)=>{
    let {token} = req.headers
    console.log(token)
    let payload = jwt.jwtVerify(token)
    console.log("ini payload",payload)

    let id = {
        where:{
            id:payload.data.id
        }
    }

    users.findOne(id)
    .then(user=>{
        if(user){
            req.payloadUser = jwt.jwtVerify(token)
            next()
        } else {
            res.status(404).json({msg:"data is not found"})
        }
    }).catch(err=>{
        res.status(500).json({msg:"internal server error"})
    })
}