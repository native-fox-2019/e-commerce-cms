const { User } = require('../models')
const { generatingJWT, veryfingJWT } = require('../helpers/jwt')
const { hashingPassword, verifyingPassword } = require('../helpers/bycrpt')
const createError = require('http-errors')

class ControllerUser {

  static register(req, res, next) {
    let { username, email, password } = req.body
    User
      .create({
        username,
        email,
        role: 'user',
        password
      })
      .then(user => {
        let payload = { id: user.id, email: user.email, role: user.role }
        let token = generatingJWT(payload)
        res.status(201).json({ token })

      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    let { email, password } = req.body
    User
      .findOne({ where: { email } })
      .then(user => {
        if (!user) {
          throw createError(400, 'Your email or password is incorrect')
        } else {
          if (verifyingPassword(password, user.password)) {
            let payload = { id: user.id, email, role: user.role }
            let token = generatingJWT(payload)
            res.status(200).json(token)
          }
        }
      })
      .catch(err => {
        console.log(err, '<<<<<<<<<<< rr login')
        next(err)
      })
  }
}

module.exports = ControllerUser