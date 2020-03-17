const router = require('express').Router()
const UserController = require('../controllers/userController')
const authorizationAdmin = require('../middlewares/authorizationAdmin')
const authentication = require('../middlewares/authentication')

router.post('/login', UserController.loginAdmin)
router.use(authentication)
router.use(authorizationAdmin)
router.post('/register', UserController.registerAdmin)
router.get('/', UserController.allUsers)

module.exports = router