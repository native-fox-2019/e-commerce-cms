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

    static async index(req,res){
        try{
            let products=await Product.findAll();
            res.status(200).json(products);
        }catch(err){
            console.log(err);
            res.statue(500).json(err);
        }
    }

    static async update(req,res){
        let id=req.params.id;
        let body=req.body;

        try{
            let result=await Product.update(body,{where:{id}});
            res.status(200).json({status:'updated',result})
        }catch(err){
            res.status(500).json(err);
        }
    }

    static async delete(req,res){
        let id=req.params.id;

        try{
            let result=await Product.destroy({where:{id}});
            res.status(200).json({status:'deleted',result});
        }catch(err){
            res.status(500).json(err);
        }
    }
}

module.exports=ProductController;
