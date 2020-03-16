const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const comparePw = require('../helper/comparePw')
require('dotenv').config()

class Controller {

    static register(request,response,next){

        User.findOne({where:{email:request.body.email}})
        .then(data=>{
            if(data){
                console.log("masuk sini")
                let errorObj={
                    status:400,
                    msg:"Email Has Been Used"
                }
                throw(errorObj)
            }else{
                console.log("ga masuk sini")
                return  User.create({
                    name:request.body.name,
                    email:request.body.email,
                    password:request.body.password,
                    level:request.body.level
                })
            }
        })
        .then(result=>{
           let token= jwt.sign({
                name:request.body.name,
                email:request.body.email,
                level:request.body.level
            },process.env.SECRET )
            response.json({token})
        })
        .catch(err=>{
            // console.log(err)
            if(err.status){
                next(err)
            }
            if (err.errors){
                let errorObj={
                    status:400,
                    msg:[]
                }
                for (let i = 0 ; i < err.errors.length;i++){
                    errorObj.msg.push(err.errors[i].message)
                }
                next(errorObj)
            }else{
                next({status:500,msg:"internal server error"})
            }
        })
    }
    
    static login(request,response,next){
        let userDatum= null

        User.findOne({where:{email:request.body.email}})
        .then(data=>{
            userDatum=data
            if(data){
                console.log(data.password)
                return comparePw(request.body.password,data.password)
            }else{
                let errorObj={
                    status:404,
                    msg:"user not found"
                }
                throw (errorObj)
            }
        })
        .then(data=>{
            console.log(data,"masuk sini")
            if (data){
                let token = jwt.sign({
                    name:userDatum.name,
                    email:userDatum.email,
                    level:userDatum.level
                    }, process.env.SECRET)
                response.send({token})
            }else{
                let errorObj={  
                    status:401,
                    msg:'Invalid User/Password'

                }
                throw(errorObj)
            }
        })
        .catch(err=>{
            if(err.status){
                next(err)
            }else{
                next({status:500,msg:"internal server error"})
            }
        })
    }

}

module.exports=Controller