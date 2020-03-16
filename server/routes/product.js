const router=require('express').Router();
const controller=require('../controllers/ProductController');

router.post('/',controller.create);

module.exports=router;