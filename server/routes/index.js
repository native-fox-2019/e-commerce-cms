const router=require('express').Router();

router.get('/',(req,res)=>{
    res.send('This is main page');
});

module.exports=router;