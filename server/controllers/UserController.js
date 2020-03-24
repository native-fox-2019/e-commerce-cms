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
                res.status(201).json(data.name)
            }) 
            .catch(err => {
                if(err.name === 'SequelizeUniqueConstraintError'){
                    next(err)
                } else {
                let error = []
                err.errors.forEach(x =>{
                    error.push(x.message)
                })
                next({error : error, status : 400})
            }
            })
        } else {
            next({
                status : 403
            })
        }
    }

    static registerUser(req, res, next){
        let { email, password, name } = req.body
        let obj = {
            email : email,
            password : password,
            name : name,
            role : 'user'
        }
        User.create(obj)
        .then(data => {
            let access_token = jwt.sign({ id : data.id, email : data.email }, process.env.SECRET);
            res.status(201).json({token : access_token, name : data.name})
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
    }

    static loginAdmin(req, res, next){
        let {email, password} = req.body
        let dataEmail = null
        let dataId = null
        let name = null
        User.findOne({where : {email:email, role:'admin'}})
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

    static loginUser(req, res, next){
        let {email, password} = req.body
        let dataEmail = null
        let dataId = null
        let name = null
        User.findOne({where : {email:email, role:'user'}})
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