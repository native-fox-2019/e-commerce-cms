const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController.js')
const productController = require('../controller/productController.js')
const authentication = require('../middleware/authentication')
const authorization= require('../middleware/authorization')

router.post('/user/register',controller.register)
router.post('/user/login',controller.login)

router.get('/product',authentication,productController.view)
router.post('/product',authentication,productController.add)
router.get('/product/:id',authentication,productController.getOne)
router.put('/product/:id',authentication,productController.edit)
router.delete('/product/:id',authentication,productController.delete)



module.exports = router