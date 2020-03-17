
const { Product } = require('../models')
require('dotenv').config()

class ProductController {
    static addNewProduct = (req, res) => {
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.create(obj)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err) {
                    let obj = {
                        error: []
                    }
                    for (let i = 0; i < err.errors.length; i++) {
                        obj.error.push(err.errors[i].message)
                    }
                    res.status(400).json(obj)
                } else {
                    res.status(500).json(err)
                }
            })
    }
    static getProduct = (req, res) => {
        Product.findAll()
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json(err)
            })
    }

    static getProductId = (req, res) => {
        let id = Number(req.params.id)
        Product.findAll({
            where: {
                id: id
            }
        })
            .then((data) => {
                if (data.length == 0) {
                    res.status(404).json({ message: `id not found` })
                } else {
                    res.status(200).json(data)
                }
            })
            .catch(err => {
                res.status(404).json(err)
            })
    }
    static editProduct = (req, res) => {
        let id = {
            where: {
                id: req.params.id
            }
        }
        let obj = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        Product.update(obj, id)
            .then(data => {
                if (data[0] == 1) {
                    res.status(200).json(obj)
                } else if (data[0] == 0) {
                    res.status(404).json(`id tidak ditemukan`)
                }
            })
            .catch(err => {
                if (err) {
                    res.status(400).json(err.errors[0].message)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static deleteProduct = (req, res) => {
        let id = Number(req.params.id)
        let temp = null
        Product.findByPk(id)
            .then(data => {
                temp = data
                if (data) {
                    return Product.destroy({
                        where: {
                            id: id
                        }
                    })
                } else {
                    res.status(404).json({message:`data not found`})
                }
            })
            .then(data => {
                res.status(200).json(temp)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProductController