const route = require('express').Router()
// const userRoute = require('./user')
// const productRoute = require('./product')
// const { authentication, authorization } = require('../middlewares/auth')
const managerRoute = require('./manager')
const shopperRoute = require('./shopper')

// route.use('/user',userRoute)
// route.use('/product', authentication, authorization, productRoute)
route.use('/manage', managerRoute)
route.use('/shop', shopperRoute)

module.exports = route