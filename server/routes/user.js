'use strict'
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/user');
const authentication = require('../middlewares/authentication')
const authorizationAdmin = require('../middlewares/authorizationAdmin')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/loginAdmin', Controller.loginAdmin)
router.use(authentication)
router.use(authorizationAdmin)
router.get('/', Controller.findAll)
router.get('/', Controller.findOne)
router.post('/', Controller.create)
router.put('/', Controller.update)
router.delete('/', Controller.destroy)
module.exports = router