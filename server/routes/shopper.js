const route = require('express').Router()
const userController = require('../controllers/user')
const productController = require('../controllers/product')
const shoppingController = require('../controllers/shoppingcart')
const { authentication, authorizationUser } = require('../middlewares/auth')

route.post('/login', userController.login)
route.post('/register', userController.register)

route.get('/', productController.showAll)
route.get('/:id', productController.showOne)
route.get('/cart', authentication, authorizationUser, shoppingController.showAll)
route.get('/cart/:id', authentication, authorizationUser, shoppingController.showOne)
route.post('/cart', authentication, authorizationUser, shoppingController.add)
route.put('/cart/:id', authentication, authorizationUser, shoppingController.edit)
route.delete('/cart/:id', authentication, authorizationUser, shoppingController.delete)
route.post('/checkout', authentication, authorizationUser, shoppingController.checkout)

module.exports = route