const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authorization = require('../middlewares/authorization')

router.get('/', ProductController.getProduct)
router.post('/', authorization, ProductController.addProduct)
router.put('/:id', authorization, ProductController.updateProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)

module.exports = router