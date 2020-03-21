const Model = require('../models')
const User = Model.User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

class UserController {
    static registerAdmin(req, res, next){
        let superpassword = 'password1234'
        let { email, password, name } = req.body
        let obj = {
            email : email,
            password : password,
            name : name,
            role : 'admin'
        }
        if(superpassword === req.body.superpassword){
            User.create(obj)
            .then(data => {
                // let access_token = jwt.sign({ id : data.id, email : data.email }, process.env.SECRET);
                // res.status(201).json({access_token})
                res.status(201).json(data.name)
            }) 
            .catch(err => {
                // console.log(err + ' <<<< err')
                if(err.name === 'SequelizeUniqueConstraintError'){
                    next(err)
                } else {
                let error = []
                err.errors.forEach(x =>{
                    error.push(x.message)
                })
                // console.log(error)
                next({error : error, status : 400})
            }
            })
        } else {
            next({
                status : 403
            })
        }
    }

    static login(req, res, next){
        let {email, password} = req.body
        let dataEmail = null
        let dataId = null
        let name = null
        User.findOne({where : {email:email}})
        .then(data =>{
            if(data){
                dataEmail = data.email
                dataId = data.id
                name = data.name
                return bcrypt.compare(password, data.password)
            } else {
                next({
                    error : `Wrong email or password`,
                    status : 400
                })
            }
        })
        .then(function(result) {
            if(result === true){
                let access_token = jwt.sign({ id : dataId, email : dataEmail }, process.env.SECRET);
                res.status(200).json({access_token, name})
            } else {
                next({
                    error : `Wrong email or password`,
                    status : 400
                })
            }
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json(err)
        })
    }

}

module.exports = UserController