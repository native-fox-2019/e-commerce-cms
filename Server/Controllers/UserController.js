const {User} = require('../models')
const makeToken = require('../Helpers/makeToken')

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
                res.status(201).json({name: result.name, token, message: 'Successfully registered and logged in'})
            }
        })
        .catch(err => {
            console.log(err, '<<< dari register')
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
}

module.exports = UserController