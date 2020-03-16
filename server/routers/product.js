const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const authorization = require('../middlewares/authorization');

router.post('/', ProductController.create);
router.get('/', ProductController.showAll);
router.use('/:id', authorization);
router.put('/:id', ProductController.editData);
router.delete('/:id', ProductController.deleteData);

module.exports = router;