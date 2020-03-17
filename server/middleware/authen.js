const { User } = require('../models')
const { generatingJWT, veryfingJWT } = require('../helpers/jwt')
const createError = require('http-errors')


module.exports = (req, res, next) => {
  const token = req.headers.token
  try {
    const user = veryfingJWT(token)
    req.user = user
    User.findOne({ where: { id: user.id } })
      .then(dataUser => {
        if (!dataUser) {
          throw createError(401, 'You Must Login First')
        } else {
          // console.log(req.user, '<<<<<<<< ??')
          next()
        }
      })
  }
  catch (error) {
    next(error)
    // res.status(404).json({ message: "Invalid Token " })
  }

}

