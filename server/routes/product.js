const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)
router.post('/', ProductController.addProduct)
router.put('/:id', authorization, ProductController.updateProduct)

module.exports = router