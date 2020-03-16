const router = require('express').Router()
const UserController = require('../Controllers/UserController')

router.post('/register', UserController.register)

module.exports = router