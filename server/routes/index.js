const router = require('express').Router()
const userRouter = require('./user')
const productRouter = require('./product')
const adminRouter = require('./admin')
const transactionRouter = require('./transactionRouter')
const errorHandling = require("../middlewares/errorHandling")


router.use('/users', userRouter)
router.use('/admins', adminRouter)
router.use('/products', productRouter)
router.use('/transaction', transactionRouter)

router.use(errorHandling)

module.exports = router