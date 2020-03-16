const route = require('express').Router()
const productController = require('../controllers/product')
const { authorization } = require('../middlewares/auth')

route.post('/product', productController.add)
// route.get('/product', productController.showAll)

// route.use(authorization)
// route.get('/product/:id', productController.showOne)
// route.put('/product/:id', productController.edit)
// route.delete('/product/:id', productController.delete)

module.exports = route