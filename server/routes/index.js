const router = require('express').Router()
const products = require('./product')

router.use('/', products)

module.exports = router
