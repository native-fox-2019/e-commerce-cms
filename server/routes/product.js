const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorizationAdmin = require('../middlewares/authorizationAdmin')

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.use(authentication)
router.use(authorizationAdmin)
router.patch('/:id', productController.update)
router.post('/', productController.create)
router.delete('/:id', productController.destroy)

module.exports = router