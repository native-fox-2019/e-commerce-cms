const router = require('express').Router()
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorizationAdmin = require('../middlewares/authorizationAdmin')

router.get('/', productController.getAll)
router.get('/:id', productController.getOne)
router.use(authentication)
router.patch('/:id', authorizationAdmin, productController.update)
router.post('/', authorizationAdmin, productController.create)
router.delete('/:id', authorizationAdmin, productController.destroy)

module.exports = router