const router = require('express').Router()
const ControllerProducts = require('../controllers/product')

router.post('/', ControllerProducts.addProduct)
router.get('/', ControllerProducts.getAllProduct)
router.get('/:id', ControllerProducts.getOneProduct)
router.put('/:id', ControllerProducts.updateProduct)
router.delete('/:id', ControllerProducts.deleteProduct)


module.exports = router