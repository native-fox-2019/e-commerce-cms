const route = require('express').Router()
const userRoute = require('./user')
const productRoute = require('./product')
const { authentication } = require('../middlewares/auth')

route.use('/user',userRoute)
route.use(authentication)
route.use('/product', productRoute)

module.exports = route