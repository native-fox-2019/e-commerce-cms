const route = require('express').Router()
const productController = require('../controllers/product')

route.post('/', productController.add)
route.get('/', productController.showAll)
route.get('/:id', productController.showOne)
route.put('/:id', productController.edit)
route.delete('/:id', productController.delete)

module.exports = route