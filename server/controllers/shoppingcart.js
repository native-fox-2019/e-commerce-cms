const { User, Product, ShoppingCart } = require('../models');
const customError = require('http-errors')

class shoppingController {
    static async add(req, res, next) {
        let UserId = req.userData.id
        let ProductId = Number(req.body.id)
        try {
            let inventory = await Product.findOne({ where: { id: ProductId } })
            if (!inventory) throw customError(404, 'Product not found!')
            if (!inventory.stock) throw customError(400, 'Sorry, we\'re out of stock for that for now.')

            let inCart = await ShoppingCart.findOne({ where: { UserId, ProductId } })
            if (!inCart) {
                if (Number(inventory.stock) < Number(req.body.quantity)) throw customError(400, 'Sorry, but You can\'t buy more than the available stock.')
                let newItem = {
                    UserId: req.userData.id,
                    ProductId,
                    quantity: Number(req.body.quantity)
                }
                let added = await ShoppingCart.create(newItem)
                res.status(201).json(added)
            } else {
                let newQuantity = { quantity: Number(inCart.quantity) + Number(req.body.quantity) }
                if (Number(inventory.stock) < newQuantity.quantity) throw customError(400, 'Sorry, but You can\'t buy more than the available stock.')
                let updatedQuantity = await ShoppingCart.update(newQuantity, { where: { id: inCart.id, UserId, ProductId } })
                res.status(200).json({ message: 'Cart item updated!' })
            }
        } catch (err) {
            next(err)
        }
    }

    static async showAll(req, res, next) {
        let UserId = Number(req.userData.id)
        try {
            let found = await User.findOne({
                where: { id: UserId },
                include: [{ model: Product }]
            })
            res.status(200).json(found)
        } catch (err) {
            next(err)
        }
    }

    static async showOne(req, res, next) {
        let id = Number(req.params.id)
        let UserId = Number(req.userData.id)
        try {
            let found = await ShoppingCart.findOne({
                where: { id, UserId },
                include: [{ model: Product }]
            })
            if (!found) throw customError(404, 'Cart item not found!')
            res.status(200).json(found)
        } catch (err) {
            next(err)
        }
    }

    static async edit(req, res, next) {
        let id = Number(req.params.id)
        let UserId = Number(req.userData.id)
        let newQuantity = { quantity: Number(req.body.quantity) }
        try {
            let inCart = await ShoppingCart.findOne({ where: { id, UserId } })
            let inventory = await Product.findOne({ where: { id: inCart.ProductId } })
            if (!inventory) throw customError(404, 'Product not found!')

            if (newQuantity.quantity < Number(inventory.stock)) {
                let updatedQuantity = await ShoppingCart.update(newQuantity, { where: { id, UserId, ProductId: inCart.ProductId } })
                res.status(200).json({ message: 'Cart item updated!' })
            } else if (newQuantity.quantity > Number(inventory.stock)) {
                throw customError(400, 'Sorry, but You can\'t buy more than the available stock.')
            } else {
                res.status(200).json({ message: 'Cart item updated!' })
            }
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        let id = Number(req.params.id)
        let UserId = Number(req.userData.id)
        try {
            let deleted = await ShoppingCart.destroy({ where: { id, UserId } })
            res.status(200).json(deleted)
        } catch (err) {
            next(err)
        }
    }

    static async checkout(req, res, next) {
        let UserId = Number(req.userData.id)
        try {
            let found = await User.findOne({
                where: { id: UserId },
                include: [{ model: Product }]
            })
            if (!found.Products.length) throw customError(400, `You have nothing in your Shopping cart yet.`)
            found.Products.forEach(product => {
                let newStock = Number(product.stock) - Number(product.ShoppingCart.quantity)
                if (newStock < 0) {
                    if (product.stock < 1) {
                        ShoppingCart.destroy(
                            { where: {id: product.ShoppingCart.id, UserId, ProductId: product.id } }
                        )
                        throw customError(400, `We're sorry, but ${product.name} is now out of stock.`)
                    } else {
                        ShoppingCart.update(
                            { quantity: product.stock },
                            { where: {id: product.ShoppingCart.id, UserId, ProductId: product.id } }
                        )
                        throw customError(400, `We're sorry, but ${product.name} has only ${product.stock} left in stock now.`)
                    }
                }
                Product.update(
                    { stock: newStock },
                    { where: { id: product.id } }
                )
                ShoppingCart.destroy({ where: { id: product.ShoppingCart.id, UserId, ProductId: product.id } })
            });
            res.status(200).json(deleted)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = shoppingController