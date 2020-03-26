const userRouter = require('express').Router()
const UserController = require('../controllers/UserController')
const Authentication = require('../middlewares/Authentication')
const SUAuthorization = require('../middlewares/SUAuthorization')

userRouter.post('/login', UserController.login)
userRouter.post('/registration', UserController.registration)

userRouter.get('/listAll', Authentication, SUAuthorization, UserController.listAll)

userRouter.patch('/addAdmin/:id', Authentication, SUAuthorization, UserController.addAdmin)
userRouter.patch('/removeAdmin/:id', Authentication, SUAuthorization, UserController.removeAdmin)

module.exports = userRouter