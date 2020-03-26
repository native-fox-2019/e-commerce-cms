const express = require('express');
const router = express.Router();
const Controller = require('../controllers/productController.js');
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

router.use(authentication);
router.post('/', authorization, Controller.addData);
router.get('/', Controller.showData);
router.get('/:id', authorization, Controller.showDatabyId);
router.put('/:id', authorization, Controller.editData);
router.delete('/:id', authorization, Controller.deleteData);

module.exports = router;