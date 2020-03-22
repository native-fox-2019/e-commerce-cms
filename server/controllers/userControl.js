const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

class UserControl {
    static register(req, res, next){
        User.findOne({
            where: {email:req.body.email}
        })
        .then(data=>{
            if(data){
                res.status(400).json("your e-mail has been registered")
            } else {
                User.create(req.body)
                .then(data=>res.status(201).json(data))
                .catch(err=>next(err))
            }
        })   
        .catch(err=>next(err))
    }

    static login(req, res, next){
        let { email, password } = req.body
        User.findOne({
            where: { email }
        })
        .then(user=>{
            if(user){
                if (bcrypt.compareSync(password, user.password)){
                    let token = jwt.sign({id: user.id, email: user.email}, 'aaa')
                    res.status(200).json({token})
                } else {
                    res.status(400).json('password wrong')
                }
            } else{
                res.status(400).json('email wrong')
            }
        })
        .catch(err => next(err))
    }

}
    
module.exports = UserControl