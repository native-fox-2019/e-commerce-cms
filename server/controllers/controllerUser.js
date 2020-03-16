'use strict'

const { User } = require('../models')
const { sign } = require('../helpers/jwt')


class ControllerUser {
    static register(req, res, next) {
        let { name, email, password } = req.body
        console.log({name, email, password})
        User.create({name, email, password, role:'user'})
        .then(data =>{
            const {id,name} = data
            let access_token = sign({id, name}, process.env.JWT_SECRET)
            res.status(201).json({access_token})
        })
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }

    static login (req,res,next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data =>{
            if(password === data.password){
                res.status(200).json(data)
            } else {
                throw {
                    status:400,
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