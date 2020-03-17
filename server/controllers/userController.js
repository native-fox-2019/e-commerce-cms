const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static registerUser(req, res, next) {
        let { email, password } = req.body
        User.create({
            email,
            password,
            isadmin : false
        })
            .then(user => {
                
                let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET)
                res.status(201).json({ token })
            })
            .catch(err => {
                console.log(err)

                res.status(500).json(err)
            })
    }

    static loginUser(req, res, next) {
        let { email, password } = req.body
        User.findOne({ where: { email } })
            .then(user => {
                if (user) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                        res.status(200).json({ token })
                    } else {
                        res.status(400).json({
                            status: 400,
                            msg: `wrong email or password`
                        })
                    }
                } else {
                    res.status(400).json({
                        status: 400,
                        msg: `wrong email or password`
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = UserController