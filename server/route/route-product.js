const Router = require('express').Router()
const controller = require('../controller/cont-product')
const authenticator = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

Router.get('/',authenticator,controller.readProduct)
Router.post('/',authenticator,authorization,controller.create)
Router.put('/:id',authenticator,authorization,controller.update)
Router.delete('/:id',authenticator,authorization,controller.delete)

module.exports = Router