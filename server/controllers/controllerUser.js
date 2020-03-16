'use strict'

require('dotenv').config()
const { User } = require('../models')
const { sign } = require('../helpers/jwt')
const {checkPass} = require('../helpers/bcrypt')


class ControllerUser {
    static register(req, res, next) {
        let { name, email, password, role } = req.body
        if(!role){
            role = 'User'
        }
        User.create({name, email, password, role})
        .then(data =>{
            const {id,role, name} = data
            let access_token = sign({id, role, name}, process.env.JWT_SECRET)
            res.status(201).json({access_token})
        })
        .catch(err =>{
            next(err)
        })
    }

    static login (req,res,next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data =>{
            if(data){
                if(checkPass(password, data)){
                    const {id, name, role} = data
                    let access_token = sign({id, name, role})
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status:404,
                        msg:'incorrect USERNAME/PASSWORD'
                    }
                }
            } else {
                throw {
                    status:404,
                    msg:'incorrect USERNAME/PASSWORD'
                }
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ControllerUser