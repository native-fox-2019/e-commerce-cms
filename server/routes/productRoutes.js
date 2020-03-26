const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)
router.use(authentication)
router.get('/:id', ProductController.getOneProduct)
router.put('/:id', ProductController.editProduct)
router.use(authorization)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.deleteProduct)

module.exports = router