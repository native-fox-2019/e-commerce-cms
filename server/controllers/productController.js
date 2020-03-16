const {Product} = require('../models');

class Controller{
    static showData(req, res, next){
        Product.findAll()
            .then(data=>{
                res.status(200).json(data);
            })
            .catch(err=>{
                next(err)
            })
    }

    static showDatabyId(req, res, next){
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                if(!data){
                    throw {
                        msg: 'User not found',
                        status: 404
                    }
                }else{
                    res.status(200).json(data)
                }
            })
            .catch(err=>{
                next(err)
            })
    }

    static addData(req, res, next){
        let dataAdd = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        
        Product.create(dataAdd)
        .then(data=>{
                res.status(201).json(data);
            })
            .catch(err=>{
                let errors = [];
                err.errors.forEach(error => {
                    errors.push(error.message);
                });

                next({
                    errors: errors,
                    msg: 'add error',
                    status: 400
                });
            })
    }

    static editData(req, res, next){
        let dataEditProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(dataEditProduct, {
            where: {
                id: req.params.id
            }
        })
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(err=>{
            next(err);
        })
    }

    static deleteData(req, res, next){
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(data=>{
                res.status(200).json(data)
            })
            .catch(err=>{
                next(err)
            })
    }
}

module.exports = Controller;