const router = require('express').Router()
const ProductController = require('../controllers/productController')
const authenticationUser = require('../middlewares/authentication')
const authorizationUser = require('../middlewares/authorization')

router.post('/',  authenticationUser,ProductController.addNewProduct)
router.get('/',  authenticationUser,ProductController.getProduct)
router.get('/:id', authenticationUser, ProductController.getProductId)
router.put('/:id',  authenticationUser,ProductController.editProduct)
router.delete('/:id',  authenticationUser,ProductController.deleteProduct)

module.exports = router