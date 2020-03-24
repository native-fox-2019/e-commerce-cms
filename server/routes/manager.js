const route = require('express').Router()
const userController = require('../controllers/user')
const productController = require('../controllers/product')
const { authentication, authorizationAdmin, authorizationSuperAdmin } = require('../middlewares/auth')

route.post('/login', userController.login)
route.post('/register', authentication, authorizationSuperAdmin, userController.registerManager)

route.post('/', authentication, authorizationAdmin, productController.add)
route.get('/', authentication, authorizationAdmin, productController.showAll)
route.get('/:id', authentication, authorizationAdmin, productController.showOne)
route.put('/:id', authentication, authorizationAdmin, productController.edit)
route.delete('/:id', authentication, authorizationAdmin, productController.delete)

module.exports = route