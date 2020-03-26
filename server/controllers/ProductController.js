const Model = require('../models')
const Product = Model.Product
class ProductController {
    static addProduct(req, res, next){
        let { name, image_url, price, stock } = req.body
        let obj = {
            name : name,
            image_url : image_url,
            price : price,
            stock : stock
        }
        Product.create(obj)
        .then(data=>{
            res.status(201).json({data})
        })
        .catch(err=>{
            if(err.name === 'SequelizeDatabaseError'){
                next({
                    status : 400
                })
            } else {
            let error = []
            err.errors.forEach(x =>{
                error.push(x.message)
            })
            next({error : error, status : 400})
            }
        })
    }

    static getProduct(req, res, next){
        Product.findAll({order : [['id', 'ASC']]})
        .then(data=>{
            res.status(200).json({data})
        })
        .catch(err=>[
            next(err)
        ])
    }

    static getOneProduct(req, res, next){
        let id = req.params.id
        Product.findOne({where : {id:id}})
        .then(data=>{
            if(data){
                res.status(200).json({data})
            } else {
                next({
                    status : 404
                })
            }
        })
        .catch(err=>[
            next(err)
        ])
    }

    static deleteProduct(req, res, next){
        let id = req.params.id
        Product.destroy({where : {id:id}})
        .then(status=>{
            if(status === 1){
                res.status(200).json(status)
            } else {
                next({
                    status : 404
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static editProduct(req, res, next){
        let id = req.params.id
        let { name, image_url, price, stock } = req.body
        let obj = {
            name : name,
            image_url : image_url,
            price : price,
            stock : stock
        }
        Product.update(obj, {where : {id:id}})
        .then(status=>{
            if(status == 1){
                res.status(200).json({message : `Update Success`})
            } else {
                next({
                    status : 404
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ProductController