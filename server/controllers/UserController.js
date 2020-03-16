const { User } = require('../models')
const { hash, comparer } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static async login (req, res, next) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({ where: { email } })
            if (!user) {
                next(
                    {
                        status: 400,
                        message: "Wrong email / password"
                    }
                )
            }
            let valid = await comparer(password, user.password)
            if (!valid) {
                next(
                    {
                        status: 400,
                        message: "Wrong email / password"
                    }
                )
            } else {
                let token = generateToken({ id: user.id, email: user.email })
                res.status(200).json({ access_token: token })
            }
        } catch (err) {
            next(err)
        }
    }

    static async register (req, res, next) {
        try {
            let { name, email, password } = req.body
            let obj = {
                name,
                email,
                password
            }
            let newUser = await User.create(obj)
            let token = generateToken({ id: newUser.id, email: newUser.email })
            res.status(200).json({ access_token: token })
        } catch (err) {
            let msg = []
            err.errors.forEach(error => {
                msg.push(error.message)
            })
            next(
                {
                    status: 400,
                    message: msg
                }
            )
        }
    }
}

module.exports = UserController