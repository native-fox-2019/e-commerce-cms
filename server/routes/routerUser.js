'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerUser')
const authUser = require('../middlewares/authorUser')

// router.use(authUser)
// console.log(123)
router.get('/cart', Controller.cart)
router.post('/addToCart/:id', Controller.addToCart)
router.delete('/delete/:id', Controller.removeFromCart)
router.delete('/checkout', Controller.checkout)

// router.put('/', Controller.editProfile)

module.exports = router