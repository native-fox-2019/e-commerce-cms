const { Product } = require('../models')

class ProductController {

    static async addProduct (req, res, next) {
        try {
            const addNewProduct = await Product.create({
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock
            })
            res.status(201).json(addNewProduct)
        } catch (error) {
            next(error)
        }
    }

    static async show (req, res, next) {
        try {
            const productList = await Product.findAll()
            res.status(200).json(productList)
        } catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        try {
            const { name, image_url, price, stock } = req.body
            const updated = await Product.update({name, image_url, price, stock}, {where:{id:req.params.id}})
            if (updated[0] != 0) {
                res.status(201).json({msg : 'Product updated'})
            } else {
                next({
                    status:404,
                    msg:'Cannot be found'
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        try {
            const deleted = await Product.destroy({where:{id:req.params.id}})
            if (deleted != 0) {
                res.status(200).json({msg : 'Product deleted'})
            } else {
                next({
                    status:404,
                    msg:'Cannot be found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
}


module.exports = ProductController