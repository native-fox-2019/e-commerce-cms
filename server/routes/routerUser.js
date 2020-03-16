'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerUser')

router.post('/register', Controller.register)
// router.post('/login', Controller.login)
// router.post('/addToCart', Controller.addToCart)
// router.get('/', Controller.getOne)
// router.get('/cart', Controller.cart)
// router.put('/', Controller.editProfile)

module.exports = router