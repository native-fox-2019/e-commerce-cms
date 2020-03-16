const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.post('/', ProductController.create);
router.get('/', ProductController.showAll);

module.exports = router;