const {User} = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


class Controller{
    static register(req, res, next){
        let dataRegister = {
            email: req.body.email,
            password: req.body.password,
            role: 'user',
            username: req.body.username
        }
        
        User.create(dataRegister)
        .then(data=>{
            let token = jwt.sign({ 
                id: data.id,
                email: data.email,
                username: data.username
            }, process.env.SECRET);

            res.status(201).json({access_token: token});
        })
        .catch(err=>{
            let errors = [];
            err.errors.forEach(error => {
                errors.push(error.message)
            });

            next({
                errors: errors,
                status: 400,
                msg: 'register error'
            });
        })
    }

    static login(req, res, next){
        
        let idLogin;
        let emailLogin;
        let usernameLogin;
        
        User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(data=>{
                idLogin = data.id;
                emailLogin = data.email;
                usernameLogin= data.username;

                return bcrypt.compare(req.body.password, data.password)
            })
            .then(function(result) {
                if(result){
                    let token = jwt.sign({ 
                        id: idLogin,
                        email: emailLogin,
                        username: usernameLogin
                    }, process.env.SECRET);

                    res.status(200).json({access_token: token})
                }else{
                    throw {
                        msg: 'Wrong email/password',
                        status: 400
                    }
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static adminRegister(req, res, next){
        let dataRegisterAdmin = {
            email: req.body.email,
            password: req.body.password,
            role: 'admin',
            username: req.body.username
        }

        User.create(dataRegisterAdmin)
            .then(data=>{
                res.status(201).json({message: 'Admin created'});
            })
            .catch(err=>{
                next(err);
            })
    }

    static adminLogin(req, res, next){
        let idLogin;
        let emailLogin;
        let usernameLogin;

        User.findOne({
            where: {
                email: req.body.email 
            }
        })
            .then(data=>{
                idLogin = data.id;
                emailLogin = data.email;
                usernameLogin= data.username;

                return bcrypt.compare(req.body.password, data.password)
            })
            .then(function(result){
                if(result){
                    let token = jwt.sign({
                        id: idLogin,
                        email: emailLogin,
                        usernameLogin: usernameLogin
                    }, process.env.SECRET)

                    res.status(200).json({access_token: token});
                }else{
                    throw {
                        msg: 'Wrong email/password',
                        status: 400
                    }
                }
            })
            .catch(err=>{
                next(err);
            })
    }
}

module.exports = Controller;