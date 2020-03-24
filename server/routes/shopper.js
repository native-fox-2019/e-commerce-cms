const route = require('express').Router()
const userController = require('../controllers/user')
const shoppingController = require('../controllers/shoppingcart')
const { authentication, authorizationUser } = require('../middlewares/auth')

route.post('/login', userController.login)
route.post('/register', userController.registerShopper)

route.get('/', productController.showAll)
route.get('/:id', productController.showOne)
route.get('/', authentication, authorizationUser, shoppingController.showAll)
route.get('/:id', authentication, authorizationUser, shoppingController.showOne)
route.post('/:id', authentication, authorizationUser, shoppingController.add)
route.put('/:id', authentication, authorizationUser, shoppingController.edit)
route.delete('/:id', authentication, authorizationUser, shoppingController.delete)

module.exports = route