const route = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')
const { authentication, authorization } = require('../middlewares/auth')

route.use('/user',userRoute)
route.use('/product', authentication, authorization, productRoute)

module.exports = route