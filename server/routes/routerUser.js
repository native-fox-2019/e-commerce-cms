'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')


router.get('/',authentication, Controller.getAll)
router.post('/addToCart', Controller.addToCart)
router.get('/cart', Controller.cart)
router.delete('/delete/:id', Controller.removeFromCart)
router.delete('/checkout', Controller.checkout)

// router.put('/', Controller.editProfile)

module.exports = router