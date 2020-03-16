const router = require('express').Router()
const products = require('./product')
const users = require('./users')

// router.use('/products', products)
router.use('/users', users)

module.exports = router
