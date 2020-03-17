const router = require('express').Router()
const authen = require('../middleware/authen')
const products = require('./product')
const users = require('./users')

// router.use('/products', products)
router.use('/users', users)
// router.use(authen)
router.use('/products', products)

module.exports = router
