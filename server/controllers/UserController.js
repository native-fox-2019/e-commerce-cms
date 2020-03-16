const { User } = require('../models')
const { hash, comparer } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController {
    static login = async (req, res, next) => {
        try {
            let { email, password } = req.body
            let user = User.findOne({ where: { email } })
            if (!user) {
                next(
                    {
                        status: 400,
                        message: "Wrong email / password"
                    }
                )
            }
            let valid = comparer(password, user.password)
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

    
}

module.exports = UserController