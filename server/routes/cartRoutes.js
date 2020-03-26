const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const CartController = require('../controllers/CartController')

router.use(authentication)
router.get('/', CartController.findCart)
router.post('/finddelete/:id', CartController.findDelete)
router.post('/addcart', CartController.addCart)
router.put('/editplus/:id', CartController.editPlus)
router.put('/editminus/:id', CartController.editMinus)
router.delete('/deletecart/:id', CartController.deleteCart)


module.exports = router