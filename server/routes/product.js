const router = require('express').Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAll)
router.post('/', productController.create)
router.delete('/:id', productController.destroy)
router.patch('/:id', productController.update)

module.exports = router