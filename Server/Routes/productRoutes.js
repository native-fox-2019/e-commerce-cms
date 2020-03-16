const router = require('express').Router()
const ProductsController = require('../Controllers/ProductsControllers')

router.post('/', ProductsController.addProduct)

module.exports = router