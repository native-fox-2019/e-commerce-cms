const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const authentication = require('../middlewares/authentication')

router.use('/', user)
router.use(authentication)
router.use('/products', product)

module.exports = router