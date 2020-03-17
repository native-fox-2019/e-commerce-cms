const router = require('express').Router()
const Controller = require('../controllers/User')

router.post('/register', Controller.register)

module.exports = router