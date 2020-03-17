'use strict'
const express = require('express');
const router = express.Router();
const User = require('./user');
const Product = require('./product');
const Category = require('./category');

router.use('/user', User)
router.use('/products', Product)
router.use('/categories', Category)

module.exports = router