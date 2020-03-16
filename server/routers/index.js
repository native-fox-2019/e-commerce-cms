const router = require('express').Router();
const user = require('./user');
const product = require('./product');
const authentication = require('../middlewares/authentication');

router.use('/users', user);
router.use(authentication);
router.use('/product', product);

module.exports = router;