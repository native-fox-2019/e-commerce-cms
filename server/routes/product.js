const router = require('express').Router()
const productController = require('../controllers/product')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


router.use(authentication)
router.post('',productController.addProduct)
router.get('',productController.getAllProducts)
router.get('/:id',authorization,productController.getProduct)
router.put('/:id',authorization,productController.updateProduct)
router.delete('/:id',authorization,productController.deleteProduct)


module.exports=router