'use strict'

const router = require('express').Router()
const Controller = require('../controllers/ControllerAdmin')

router.post('/products',Controller.addProduct)
router.put('/products/:id',Controller.editProduct)
router.delete('/products/:id',Controller.deleteProduct)

module.exports = router