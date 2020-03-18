'use strict'
const router = require('express').Router()
const Controller = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/',authentication, Controller.getAll)
// router.post('/addToCart', Controller.addToCart)
// router.get('/', Controller.getOne)
// router.get('/cart', Controller.cart)
// router.put('/', Controller.editProfile)

module.exports = router