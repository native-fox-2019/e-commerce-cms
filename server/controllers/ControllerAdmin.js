'use strict'

const { Product } = require('../models')

class ControllerAdmin {
    static addProduct(req, res, next) {
        const { name, price, stocks, imageURL } = req.body
        Product.create({name, price, stocks, imageURL})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOne(req, res, next) {
        let id = Number(req.params.id)
        Product.findOne({ where: { id } })
            .then(data => {
                if (data) {
                    console.log(data)
                    res.status(200).json(data)
                } else {
                    throw {
                        status: 404,
                        msg: 'Not Found'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static editProduct(req, res, next) {
        let id = Number(req.params.id)
        const { name, price, stocks, imageURL } = req.body
        Product.update({ name, price, stocks, imageURL }, {where:{id}})
            .then(data => {
                return Product.findOne({where:{id}})
            })
            .then(data =>{
                res.status(200).json(data)
            })
            .catch(err => {
                console.log(err.name)
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let id = Number(req.params.id)
        let temp = null
        Product.findOne({ where: { id } })
            .then(data => {
                temp = data
                return Product.destroy({ where: { id } })
            })
            .then(data => {
                res.status(200).json(temp)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ControllerAdmin