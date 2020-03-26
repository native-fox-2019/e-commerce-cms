'use strict'
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/cart');
const authentication = require('../middlewares/authentication')
const authorizationNonAdmin = require('../middlewares/authorizationNonAdmin')
// const authorizationOwner = require('../middlewares/authorizationOwner')


router.use(authentication)
router.use(authorizationNonAdmin)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.post('/', Controller.create)
// router.use(authorizationOwner)
router.patch('/:id', Controller.update)
router.delete('/:id', Controller.destroy)

module.exports = router