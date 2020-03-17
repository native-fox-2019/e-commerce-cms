const router = require('express').Router()
const productRouter = require('./product')
const userRouter = require('./user')

router.use('/product',productRouter)
router.use('/user',userRouter)

module.exports= router

