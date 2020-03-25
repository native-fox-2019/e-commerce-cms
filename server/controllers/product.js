const { Product } = require('../models');
const customError = require('http-errors')

class productController {
    static async add(req, res, next) {
        let newProduct = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            let added = await Product.create(newProduct)
            res.status(201).json(added)
        } catch (err) {
            next(err)
        }
    }

    static async showAll(req, res, next) {
        try {
            let listed = await Product.findAll()
            res.status(200).json(listed)
        } catch (err) {
            next(err)
        }
    }

    static async showOne(req, res, next) {
        let id = Number(req.params.id)
        try {
            let found = await Product.findOne({ where: { id } })
            if (!found) throw customError(404)
            res.status(200).json(found)
        } catch (err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        let id = Number(req.params.id)
        let editData = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock
        }
        try {
            let found = await Product.findOne({ where: { id } })
            if (!found) throw customError(404)
            let updated = await Product.update(editData, { where: { id } })
            res.status(200).json(updated)
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        let id = Number(req.params.id)
        try {
            let found = await Product.findOne({ where: { id } })
            if (!found) throw customError(404)
            let deleted = await Product.destroy({ where: { id } })
            res.status(200).json(deleted)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = productController