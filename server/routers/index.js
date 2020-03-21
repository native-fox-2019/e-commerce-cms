"use strict"
const router = require('express').Router();
const productRouter = require('./productRouter.js');
const userRouter = require('./userRouter.js');
const passwordWolfRouter = require("./PasswordWolfRouter.js");
const Authentication = require("../middleware/Authentication.js");
const Authorization = require("../middleware/Authorization.js");

router.use('/products', Authentication, Authorization, productRouter);
router.use('/users', userRouter);
router.use('/passwordWolf', passwordWolfRouter);

module.exports = router;
//semangat :)