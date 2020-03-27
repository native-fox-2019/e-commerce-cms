'use strict'

require('dotenv').config()
const { Sequelize, User, Product, Cart } = require('../models')
const { sign } = require('../helpers/jwt')
const { checkPass } = require('../helpers/bcrypt')
const Op = Sequelize.Op

class ControllerUser {
    static getAll(req, res, next) {
        Product.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
    static addToCart(req, res, next) {
        Cart.findOne({
            where: {
                [Op.and]: [
                    { UserId: req.user.id },
                    { ProductId: req.params.id }
                ]
            }
        })
            .then(data => {
                if (data) {
                    let payload = {
                        UserId: data.UserId,
                        ProductId: Number(data.ProductId),
                        amount: Number(data.amount) + Number(req.body.amount)
                    }
                    return Cart.update(payload, { where: { id: data.id } })
                } else {
                    let payload = {
                        UserId: req.user.id,
                        ProductId: Number(req.params.id),
                        amount: Number(req.body.amount)
                    }
                    console.log(payload)
                    return Cart.create(payload)
                }
            })
            .then(data => res.status(201).json({ message: `item(s) has been added to your cart` }))
            .catch(err => {
                console.log(err)
                next(err)
            })
    }
    static cart(req, res, next) {
        Cart.findAll({ where: { UserId: req.user.id }, include: [Product] })
            .then(data => {
                console.log(data[0])
                res.status(200).json({data})
            })
            .catch(err => {
                console.log(err)
                next(err)
            })
    }

    static removeFromCart(req, res, next) {
        let temp = null
        Cart.findOne({ where: { id: req.params.id } })
            .then(data => {
                if (data) {
                    return Cart.destroy({ where: { id: req.params.id } })
                } else {
                    next({
                        status: 404,
                        message: "you haven't put this item(s) on your cart yet"
                    })
                }
            })
            .then(() => res.status(200).json({ message: `succesfully removing from your cart`, }))
            .catch(next)
    }
    static async checkout(req, res, next) {
        try {
            const { id } = req.user
            const cart = await Cart.findAll({ where: { UserId: id }, include: [Product] })
            let checkout = []
            cart.forEach(el => {
                const remaining = el.Product.stocks - el.amount
                checkout.push(Product.update({ stocks: remaining }, { where: {id: el.Product.id }}))
            });
            console.log(checkout)
            checkout.push(Cart.destroy({ where: { UserId: req.user.id }}))
            await Promise.all(checkout)
            res.status(200).json({ message: 'check out success'})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = ControllerUser