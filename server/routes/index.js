const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

router.get('/', (req, res, next) => {
    res.status(200).send("Hope the Test passed")
})
router.use('/user', userRoutes)
router.use('/product', productRoutes)
module.exports = router