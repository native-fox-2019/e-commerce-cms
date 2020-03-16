const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next){
        let { email, password, name, role } = req.body
        let obj = {
            email : email,
            password : password,
            name : name,
            role : role
        }
        User.create(obj)
        .then(data => {
            let access_token = jwt.sign({ id : data.id, email : data.email }, process.env.SECRET);
            res.status(201).json(access_token)
        }) 
        .catch(err => {
            let error = []
            err.errors.forEach(x =>{
                error.push(x.message)
            })
            next(error)
        })
    }

    static login(req, res, next){
        let {email, password} = req.body
        User.findOne({where : {email:email , password:password}})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    }

}

module.exports = UserController