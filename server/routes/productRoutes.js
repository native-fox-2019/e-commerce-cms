const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.use(authorization)
router.get('/', ProductController.getProduct)
router.get('/:id', ProductController.getOneProduct)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.deleteProduct)
router.put('/:id', ProductController.editProduct)

module.exports = router