const {Product} = require('../models')

class ProductController {
    static addProduct(req, res, next){
        let {name, image_url, price, stock} = req.body;
        Product.create({
            name, image_url, price, stock
        })
        .then(product => {
            res.status(201).json({message: 'Successfully add the product', product: product})
        })
        .catch(err => {
            console.log(err, '<<<< error dari add product')
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
}

module.exports = ProductController