const { Product } = require('../models/index.js')

class productController{

    static view(req,res,next){
        Product.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
               next({status: 500, msg: 'Internal server error!'}) 
        })
    }

    static add(req,res,next){
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.create(obj)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
            } else{
                next({status: 500, msg: 'Internal server error!'})
            }
        })
    }

    static getOne(req,res,next){
        let id = req.params.id
        Product.findOne({where:{id:id}})
        .then(result=>{
            if(result){
               res.status(200).json(result) 
            } else{
                next({status: 404, msg: 'Data not found!'})
              }
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
    }

    static edit(req,res,next){
        let id = req.params.id
        let obj = {
            name : req.body.name,
            image_url : req.body.image_url,
            price : req.body.price,
            stock : req.body.stock
        }
        Product.update(obj,{where:{id:id}})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            if(err){
                let totalError = {}
                for(let i = 0; i < err.errors.length; i++){
                    totalError[err.errors[i].path] = {
                        msg : err.errors[i].message
                    }
                } 
                next({status: 400, msg: totalError})
            } else{
                next({status: 500, msg: 'Internal server error!'})
            }
            
        })
    }

    static delete(req,res,next){
        let id = req.params.id
        Product.destroy({where:{id:id}})
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err=>{
            next({status: 500, msg: 'Internal server error!'})
        })
        
    }

}

module.exports = productController