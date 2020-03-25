'use strict'

require('dotenv').config()
const { User,Products } = require('../models')
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

    static getAll(req,res,next){
        Products.findAll({order:[['id','asc']]})
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }
    static addToCart (req,res,next){
        Cart.create(payload)
        .then(data => res.status(201).json({message: `${data.name} has been added to your cart`}))
        .catch(next)
    }
    static cart (req,res,next){
        Cart.findAll({where:{UserId:req.user.id}})
        .then(data => res.status(200).json(data))
        .catch(next)
    }
    static editProfile (req,res,next){}
}

module.exports = ControllerUser