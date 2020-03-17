const router = require('express').Router()
const ProductsController = require('../Controllers/ProductsControllers')
const authentication = require('../Middlewares/authentication')
const authorization = require('../Middlewares/authorization')

router.get('/', authentication, ProductsController.getAllProducts)
router.post('/', authentication, authorization, ProductsController.addProduct)

router.get('/:id', authentication, ProductsController.getOneProduct)
router.put('/:id', authentication, authorization, ProductsController.editProduct)
router.delete('/:id', authentication, authorization, ProductsController.deleteProduct)

module.exports = router