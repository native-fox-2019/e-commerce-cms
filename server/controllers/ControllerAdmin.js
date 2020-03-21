'use strict'

const { Products } = require('../models')

class ControllerAdmin {
    static addProduct(req, res, next) {
        const { name, price, stocks, imageURL } = req.body
        Products.create({name, price, stocks, imageURL})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static getOne(req, res, next) {
        let id = Number(req.params.id)
        Products.findOne({ where: { id } })
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
        Products.update({ name, price, stocks, imageURL }, {where:{id}})
            .then(data => {
                return Products.findOne({where:{id}})
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
        Products.findOne({ where: { id } })
            .then(data => {
                temp = data
                return Products.destroy({ where: { id } })
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