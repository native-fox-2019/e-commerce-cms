'use strict'

const router = require('express').Router()
const routerAdmin = require('./routerAdmin')
const routerUser = require('./routerUser')
const Controller = require('../controllers/generalController')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const routerGeneral = require('./generalRouter')
const routerProducts = require('./routerProducts')
const routerCart = require('./routerCart')

router.use('/', routerGeneral)
router.use(authentication)
router.use('/products', routerProducts)
router.use('/admin', authorization, routerAdmin)

module.exports = router