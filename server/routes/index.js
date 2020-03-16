'use strict'

const router = require('express').Router()
const routerAdmin = require('./routerAdmin')
const routerUser = require('./routerUser')
const Controller = require('../controllers/controllerUser')
const authorization = require('../middlewares/')

router.use('/user', routerUser )
// router(authorization)
router.use('/admin', routerAdmin)

module.exports = router