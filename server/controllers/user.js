const { User } = require('../models')

class userController {
    static async register(req, res, next) {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }
        try {
            let reg = await User.create(newUser)
            res.status(201).json(reg)
            next()
        } catch (error) {
            next(err)
        }
    }
}

module.exports = userController