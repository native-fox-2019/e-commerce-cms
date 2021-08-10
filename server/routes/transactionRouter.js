const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorizationNonAdmin')
const authorizationOwner = require('../middlewares/authorizationOwner')

router.get('/allCart', transactionController.allCart)
router.use(authentication)
router.use(authorization)
router.get('/', transactionController.get)
router.get('/:id', authorizationOwner, transactionController.getOne)
router.post('/', transactionController.add)
router.delete('/:id', authorizationOwner, transactionController.destroy)
router.patch('/:id', authorizationOwner, transactionController.updateQuantity)

module.exports = router