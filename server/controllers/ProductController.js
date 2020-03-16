const { Product } = require('../models');

class ProductController {
    static async create(req, res, next) {
        try {
            let { name, image_url, price, stock } = req.body;
            let obj = { name, image_url, price, stock };
            let newProduct = await Product.create(obj);
            res.status(201).json(newProduct);
        } catch (err) {
            next(err);
        }
    }
    static async showAll(req, res, next) {
        try {
            let products = await Product.findAll();
            res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProductController;