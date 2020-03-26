const express = require('express')
const router = express.Router()
const controller = require('../controller/adminController.js')
const productController = require('../controller/productController.js')
const authentication = require('../middleware/authentication')
const authorization= require('../middleware/authorization')

router.post('/user/register',controller.register)
router.post('/user/login',controller.login)

router.get('/product',authentication,authorization,productController.view)
router.post('/product',authentication,authorization,productController.add)
router.get('/product/:id',authentication,authorization,productController.getOne)
router.put('/product/:id',authentication,authorization,productController.edit)
router.delete('/product/:id',authentication,authorization,productController.delete)



module.exports = router