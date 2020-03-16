const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next){
        console.log('masuk controller')
        let { email, password, name, role } = req.body
        let obj = {
            email : email,
            password : password,
            name : name,
            role : role
        }
        User.Create(obj)
        .then(data => {
            res.status(201).json(data)
        }) 
        .catch(err => {
            res.status(500).json(err)
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