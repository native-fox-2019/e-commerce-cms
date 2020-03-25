const route = require('express').Router()
const userController = require('../controllers/user')
const { authentication, authorization } = require('../middlewares/auth')

route.post('/register', authentication, authorization, userController.register)
route.post('/login', userController.login)

module.exports = route