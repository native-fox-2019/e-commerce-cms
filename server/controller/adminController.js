const { Product, Admin } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



class adminController{

    static register(req,res,next){
        const obj = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            roles : 'admin'
        }
        Admin.create(obj)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
                } else{
                next({status: 501, msg: 'Internal server error!'})
                }
        })
    }

    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        Admin.findOne({where:{email:email}})
        .then(data=>{
                return bcrypt.compare(password,data.password)
                .then(result=>{
                    if(result === true){
                        let token = jwt.sign({email:data.email,id:data.id,roles:data.roles},process.env.JWT_KEY)
                        res.status(200).json({ token })
                    } else{
                        next({status: 400, msg: 'Wrong email/password!'})
                    }
                })
        })
        .catch(err=>{
            next({status: 501, msg: 'Internal server error!'})
        })
    }

}

module.exports = adminController