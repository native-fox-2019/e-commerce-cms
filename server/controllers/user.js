const { User } = require('../models')
const { generatingJWT, veryfingJWT } = require('../helpers/jwt')

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
        let payload = { id: user.id, email }
        let token = generatingJWT(payload)
        res.status(201).json(token)

      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = ControllerUser