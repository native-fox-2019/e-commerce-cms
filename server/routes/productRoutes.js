const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.getProduct)
router.get('/:id', ProductController.getOneProduct)
router.post('/', authorization, ProductController.addProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)
router.put('/:id', authorization, ProductController.editProduct)

module.exports = router