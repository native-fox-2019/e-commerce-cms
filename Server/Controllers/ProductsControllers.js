const {Product} = require('../models')

class ProductController {
    static getAllProducts(req, res, next){
        Product.findAll()
        .then(products => {
            products.sort((a, b) => a.id - b.id);
            res.status(200).json({products})
        })
        .catch(err => {
            next({status: 500, msg: 'Server Error'})
        })
    }
    static addProduct(req, res, next){
        let {name, image_url, price, stock} = req.body;
        Product.create({
            name, image_url, price, stock
        })
        .then(product => {
            res.status(201).json({message: 'Successfully add the product', product: product})
        })
        .catch(err => {
            if(err.errors){
                let error = []
                err.errors.forEach(item => {
                    error.push({
                        type: item.type,
                        path: item.path,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
    static getOneProduct(req, res, next){
        let id = Number(req.params.id);
        Product.findByPk(id)
        .then(product => {
            if(product){
                res.status(200).json({product})
            }else{
                next({status: 404, msg:'Product not found'})
            }
        })
        .catch(err => {
            next({status: 500, msg: 'Server Error'})
        })
    }
    static editProduct(req, res, next){
        let id = Number(req.params.id)
        let {name, image_url, price, stock} = req.body;
        let product = {name, image_url, price, stock}
        Product.findOne({where: {id}})
        .then(productFound => {
            if(productFound){
                return Product.update(product, {where: {id}})
            }else{
                next({status: 404, msg: 'Product not found'})
            }     
        }) 
        .then(result => {
            if(result){
                res.status(200).json({message: 'Successfully edit the product', product})
            }
        })
        .catch(err => {
            if(err.errors){
                let error = []
                err.errors.forEach(item => {
                    error.push({
                        type: item.type,
                        path: item.path,
                        msg: item.message
                    })
                })
                next({status: 400, error})
            }else{
                next({status: 500, msg: 'Server Error'})
            }
        })
    }
    static deleteProduct(req, res, next){
        let id = req.params.id
        Product.destroy({where: {id}})
        .then(result => {
            if(result){
                res.status(200).json({message: 'Successfully delete product'})
            }else{
                next({status: 404, msg: 'Product not found'})
            }
        })
        .catch(err => {
            next({status: 500, msg: 'Server Error'})
        })
    }
}

module.exports = ProductController