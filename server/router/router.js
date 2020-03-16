const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController.js')

router.post('/user/register',controller.register)



module.exports = router