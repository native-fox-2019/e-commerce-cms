const { Product } = require('../models')

class ProductController {
    static async getProduct (req, res, next) {
        let products = await Product.findAll()
        res.status(200).json(products)
    }

    static async addProduct (req, res, next) {
        try {
            let { name, image_url, price, stock } = req.body
            let obj = {
                name,
                image_url,
                price,
                stock
            }
            let newProduct = await Product.create(obj)
            res.status(201).json({ newProduct , message: "Added a new product!"})
        } catch (err) {
            let msg = []
            err.errors.forEach(error => {
                msg.push(error.message)
            })
            next(
                {
                    status: 400,
                    message: msg
                }
            )
        }
    }

    static async updateProduct (req, res, next) {
        try {
            let { name, image_url, price, stock } = req.body
            let id = req.params.id
            let obj = {
                name,
                image_url,
                price,
                stock
            }
            let product = await Product.findOne({ where: { id } })
            if (!product) {
                next(
                    {
                        status: 404,
                        message: "Product not found"
                    }
                )
            } else {
                let edited = await Product.update(obj, { where: { id } })
                if (edited) {
                    res.status(200).json({ edited: obj, message: "Product edited" })
                }
            }
        } catch (err) {
            let msg = []
            err.errors.forEach(error => {
                msg.push(error.message)
            })
            next(
                {
                    status: 400,
                    message: msg
                }
            )
        }
    }

    static async deleteProduct (req, res, next) {
        try {
            let id = req.params.id
            let deleted = Product.destroy({ where: { id } })
            if (deleted) {
                res.status(200).json({ message: "Product Deleted" })
            }
        } catch (err) {
            next(error)
        }
    }
}

module.exports = ProductController