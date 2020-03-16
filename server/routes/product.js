const router = require('express').Router()
const ControllerProducts = require('../controllers/product')

router.post('/', ControllerProducts.addProduct)

module.exports = router