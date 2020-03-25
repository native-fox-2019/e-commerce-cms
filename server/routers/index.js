const router = require('express').Router()
const userRoute = require ('./userRoute')
const productRoute = require ('./productRoute')
const cartRoute = require('./cartRoute')



router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)


module.exports = router