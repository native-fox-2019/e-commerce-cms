const express = require('express')
const router  = express.Router()

const { authentication } = require('../middlewares/auth.js')

const userRoutes = require('./userRoutes.js')
const itemRoutes = require('./itemRoutes.js')
const cartRoutes = require('./cartRoutes')

router.get('/', function(req,res,next) {
    res.status(200).json({
        message: 'You are connected to the server, refers to API documentation for further information'
    })
})

router.use('/user', userRoutes)
router.use('/items', itemRoutes)

router.use(authentication)
router.use('/carts', cartRoutes)

module.exports = router