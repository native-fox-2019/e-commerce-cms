const {Product}=require('../models');

class ProductController{
    static async create(req,res){
        let {name,image_url,price,stock}=req.body;

        try{
            let product=await Product.create({name,image_url,price,stock});
            res.status(201).json({status:'Product has created',product});
        }catch(err){
            res.status(500).json(err);
        }


    }
}

module.exports=ProductController;
