const ControllerUser = require('../controllers/user')
const router = require('express').Router()

router.post('/register', ControllerUser.register)

module.exports = router