'use strict'
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/category');
const authorizationAdmin = require('../middlewares/authorizationAdmin')
const authentication = require('../middlewares/authentication')


router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.use(authentication)
router.use(authorizationAdmin)
router.post('/', Controller.create)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.destroy)

module.exports = router