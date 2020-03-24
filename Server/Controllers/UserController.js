const {User} = require('../models')
const makeToken = require('../Helpers/makeToken')
const comparePassword = require('../Helpers/comparePassword')

class UserController {
    static register(req, res, next){
        let {name, email, password} = req.body;
        let role = 'customer'
        User.findOne({where: {email}})
        .then(user => {
            if(user){
                next({status: 400, msg: 'Email has been used'})
            }else{
                return User.create({
                    name, email, password, role
                })
            }
        })
        .then(result => {
            if(result) {
                let token = makeToken(result);
                res.status(201).json({name: result.name, token, message: 'Successfully registered and logged in', id: result.id, role})
            }
        })
        .catch(err => {
            if(err.errors){
                let error = []
                err.errors.forEach(item => {
                    error.push({
                        type: item.type,
                        path: item.path,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
    static login(req, res, next){
        let {email, password} = req.body
        let userFound = null
        User.findOne({where: {email}})
        .then(user => {
            if(user){
                userFound = user
                return comparePassword(password, user.password)
            }else{
                next({status: 404, msg: 'Wrong Email'})
            }
        })
        .then(result => {
            if (result){
                let token = makeToken(userFound);
                res.status(200).json({name:userFound.name, token, message: 'Successfully logged in', role: userFound.role})
            }else{
                next({status: 400, msg: 'Wrong Password'})
            }
        })
        .catch(err => {
            next({status: 500, msg: 'Server Error'})
        })
    }
}

module.exports = UserController