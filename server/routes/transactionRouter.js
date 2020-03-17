const router = require('express').Router()
const transactionController = require('../controllers/transactionController')
const authentication = require('../middlewares/authentication')
// const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', transactionController.getAll)
router.get('/:id', transactionController.getOne)
router.post('/', transactionController.add)
router.delete('/:id', transactionController.destroy)

module.exports = router