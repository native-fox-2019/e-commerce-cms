const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProduct)
router.post('/', ProductController.addProduct)

module.exports = router