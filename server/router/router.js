const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController.js')

router.post('/user/register',controller.register)
router.post('/user/login',controller.login)



module.exports = router