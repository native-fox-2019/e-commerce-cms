const { users } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class userController{

static register(req,res){
let input = {
    email:req.body.email,
    password:req.body.password,
    role:"User"
}

users.create(input)
.then(data=>{
    console.log("ini user:",data)
    let token=jwt.jwtSign({
        id:data.id,
        email:data.email
    })
    console.log("isi token",token)
    res.status(201).json({token})
    console.log("ini token")
}).catch(err=>{
    res.status(401).json(err)
})
}

static login(req,res){
    let email={
        where:{
            email: req.body.email
        }
    }
    let password = req.body.password
users.findOne(email)
.then(user=>{
    let isValidate = bcrypt.checker(password,user.password)
    if(isValidate){
        let token = jwt.jwtSign({
            id:user.id,
            email:user.email
        })
        res.status(200).json({token})
    } else {
        res.status(404).json({msg:"id or email is not found"})
    }
}).catch(err=>{
    res.status(500).json({msg:"internal server error"})
})
}

}
module.exports=userController