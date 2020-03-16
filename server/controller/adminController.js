const { Product, Admin } = require('../models/index.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



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

}

module.exports = adminController