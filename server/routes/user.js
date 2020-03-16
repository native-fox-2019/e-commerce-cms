const router = require('express').Router()
const UserController = require('../controllers/userController')
const authorizationAdmin = require('../middlewares/authorizationAdmin')

router.post('/loginUser', UserController.loginUser)
router.post('/loginAdmin', UserController.loginAdmin)
router.post('/registerAdmin', authorizationAdmin, UserController.registerAdmin)
router.post('/registerUser', UserController.registerUser)
router.get('/allUsers', UserController.allUsers)

module.exports = router