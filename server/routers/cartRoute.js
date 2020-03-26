const router = require('express').Router()
const CartController = require('../controllers/cartController')
const authentication = require('../middlewares/authentication')

router.get('/', authentication, CartController.getAll)
router.post('/', authentication, CartController.addToCart)
router.delete('/all', authentication, CartController.deleteAllCart)
router.delete('/:id', authentication, CartController.deleteCart)

module.exports = router