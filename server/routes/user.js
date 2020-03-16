const router = require('express').Router()
const UserController = require('../controllers/userController')



router.post('/login', UserController.login)
router.post('/registerAdmin', UserController.registerAdmin)
router.post('/registerUser', UserController.registerUser)
router.get('/allUsers', UserController.allUsers)

module.exports = router