const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

router.post('/loginadmin', UserController.loginAdmin)
router.post('/loginuser', UserController.loginUser)
router.post('/registeradmin', UserController.registerAdmin)
router.post('/registeruser', UserController.registerUser)

module.exports = router 