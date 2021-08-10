const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.loginUser)
router.post('/register', UserController.registerUser)
router.get('/', UserController.allUsers)

module.exports = router