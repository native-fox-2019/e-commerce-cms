const router = require('express').Router()
const ProductsController = require('../Controllers/ProductsControllers')

router.get('/', ProductsController.getAllProducts)
router.post('/', ProductsController.addProduct)

module.exports = router