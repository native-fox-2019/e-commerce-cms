const { users } = require('../models')
const bcrypt = require('../helpers/bcrypt')
const jwt = require('../helpers/jwt')

class userController {

    static register(req, res) {
        let input = {
            email: req.body.email,
            password: req.body.password,
            role: "Admin"
        }
        console.log("ini req.body",req.body)

        users.create(input)
            .then(data => {
                console.log("ini user:", data)
                let token = jwt.jwtSign({
                    id: data.id,
                    email: data.email
                })
                console.log("isi token", token)
                res.status(201).json({token})
                console.log("ini token")
            }).catch(err => {
                res.status(401).json({msg:"email and password must be filled"})
            })
    }

    static login(req, res) {
        let email = {
            where: {
                email: req.body.email
            }
        }
        let password = req.body.password

        console.log("ini email", email, "ini password=>", password,"ini req.body=>",req.body)

        users.findOne(email)
            .then(user => {
                let isValidate = bcrypt.checker(password, user.password)
                if (isValidate) {
                    let token = jwt.jwtSign({
                        id: user.id,
                        email: user.email
                    })
                    console.log("ini token",token)
                    console.log("ini obj token",{token})
                    res.status(200).json({ token })
                    console.log("ini token",token)
                    console.log("ini obj token",{token})
                } else {
                    res.status(404).json({ msg:"id or email is not found" })
                }
            }).catch(err => {
                res.status(500).json({ msg: "internal server error",
            error:err.error })
            })
    }

}
module.exports = userController