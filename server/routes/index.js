const route = require('express').Router()
const userRoute = require('./user')

route.use('/user',userRoute)

module.exports = route