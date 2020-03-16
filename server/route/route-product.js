const Router = require('express').Router()
const controller = require('../controller/cont-product')

Router.post('/',controller.create)
Router.get('/',controller.readProduct)
Router.put('/:id',controller.update)
Router.delete('/:id',controller.delete)

module.exports = Router