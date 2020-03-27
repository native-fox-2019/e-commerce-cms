const {User} = require('../models')
const {checkPassword} = require('../helpers/bcryptjs.js')
const {generateToken} = require('../helpers/jsonwebtoken.js')
const { OAuth2Client } = require('google-auth-library');
const clientID = "880828445755-hem0eh6nccer93hbfi0rjbkpjhtu5d8f.apps.googleusercontent.com"
const client = new OAuth2Client(clientID);

class Controller {

    static register(req, res, next) {
        console.log('register')
        let obj = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'customer',
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({ data, message: 'Successfully registered new user' })
        })
        .catch(next)
    }

    static login(req, res, next) {
        let obj = {
            email: req.body.email,
            password: req.body.password,
        }
        let option = {
            where: { email: obj.email }
        }

        User.findOne(option)
        .then(user => {
            if (!user) throw {status: 400, message: 'Wrong email/password'}

            let inputPass = obj.password
            let userPass = user.password
            let compare = checkPassword(inputPass, userPass)

            if (!compare) throw {status: 400, message: 'Wrong email/password'}

            let payload = {id: user.id, username: user.username, email: user.email}
            let token = generateToken(payload)

            console.log('Token', token)

            res.status(200).json({ token })
        })
        .catch(next)
    }

    static update(req, res, next) {
        let obj
        let option = { where: { id: req.params.id }}

        User.update(obj, option)
        .then(current => {
            if (!current) throw {}

        })
        .catch(next)
    }

    static destroy(req, res, next) {
        let option = { where: { id: req.params.id }}
        User.destroy(option)
        .then(destroyedData => res.status(200).json({ destroyedData }))
        .catch(next)
    }

    static googleLogin(req, res, next) {
        let email = null;
        client.verifyIdToken({
            idToken: req.body.token,
            audience: clientID,
        })
        .then(ticket => {
            email = ticket.getPayload().email
            return User.findOne({ where: { email: email } })
        })
        .then(data => {
            if (data) {
                return data
            } else {
                return User.create({
                    username: email,
                    email: email,
                    password: "123456789"
                })
            }
        })
        .then(data => {
            // let token = jwt.sign({ id: data.id, email: data.email }, process.env.JWT_SECRET)
            const payload = {
                id: data.id,
                email: data.email,
            }
            let token = generateToken(payload)
            res.status(200).json({ token })
        })
        .catch(next)
    }
}

module.exports = Controller