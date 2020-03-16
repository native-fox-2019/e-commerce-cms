'use strict'

const router = require('express').Router()
const routerAdmin = require('./routerAdmin')
const routerUser = require('./routerUser')
const Controller = require('../controllers/controllerUser')
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')

router.use('/user', routerUser )
// router.use(authentication)
// router.use(authorization)
router.use('/admin', authentication, authorization, routerAdmin)

module.exports = router