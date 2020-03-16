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
}


module.exports = ProductController