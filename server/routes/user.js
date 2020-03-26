const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userController');
const adminLoginAuthorization = require('../middlewares/adminLoginAuthorization.js');

router.post('/register', Controller.register);
router.post('/login', Controller.login);
router.post('/adminRegister', Controller.adminRegister);
router.post('/adminLogin', adminLoginAuthorization, Controller.adminLogin);

module.exports = router;