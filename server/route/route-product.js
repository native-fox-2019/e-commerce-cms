const Router = require('express').Router()
const controller = require('../controller/cont-product')

Router.post('/',controller.create)

module.exports = Router