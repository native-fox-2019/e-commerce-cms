'use strict'

const router = require('express').Router()
const routerAdmin = require('./routerAdmin')
const routerUser = require('./routerUser')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const routerGeneral = require('./generalRouter')


router.use('/', routerGeneral)
router.use(authentication)
router.use('/user', routerUser)
router.use('/admin', authorization, routerAdmin)

module.exports = router