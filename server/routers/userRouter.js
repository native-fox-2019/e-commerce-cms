const userRouter = require('express').Router()
const UserController = require('../controllers/UserController')

userRouter.post('/login', UserController.login)
userRouter.post('/registration', UserController.registration)
// userRouter.patch('/addAdmin/:id', UserController.addAdmin)

module.exports = userRouter