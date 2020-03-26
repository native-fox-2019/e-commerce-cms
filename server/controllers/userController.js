const { User } = require('../models')
const { create } = require('../helpers/token')
const { encode, decode } = require('../helpers/bcrypt')

class UserController {

    static async login (req, res, next) {
        try {
            const userLogin = await User.findOne({where:{email:req.body.email}})
            if (userLogin) {
                const match = await decode(req.body.password, userLogin.password)
                if (match) {
                    const token = create({
                        id: userLogin.id,
                        name: userLogin.name,
                        email: userLogin.email,
                        role: userLogin.role
                    })
                    res.status(200).json({access_token:token, role:userLogin.role})
                } else {
                    next({
                        status: 400,
                        msg: 'Invalid Email / Password'
                    })
                }
            } else {
                next({
                    status: 400,
                    msg: 'Invalid Email / Password'
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async register (req, res, next) {
        try {
            const find = await User.findOne({where:{email: req.body.email}})
            if (!find) {
                const newUser = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                })
                const token = create({
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role
                })
                res.status(200).json({access_token:token, role:newUser.role})
            } else {
                next({
                    status:403,
                    msg:'Email already registered'
                })
            }
            
        } catch (error) {
            next(error)  
        }   
    }
}


module.exports = UserController