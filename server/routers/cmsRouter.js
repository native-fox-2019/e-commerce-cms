"use strict"
const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.get('/', ProductController.getProducts);
router.post('/', ProductController.addProduct);
router.get('/:id', ProductController.getProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;