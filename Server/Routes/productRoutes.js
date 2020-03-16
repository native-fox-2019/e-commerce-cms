const router = require('express').Router()
const ProductsController = require('../Controllers/ProductsControllers')

router.get('/', ProductsController.getAllProducts)
router.post('/', ProductsController.addProduct)

router.get('/:id', ProductsController.getOneProduct)
router.put('/:id', ProductsController.editProduct)
router.delete('/:id', ProductsController.deleteProduct)

module.exports = router