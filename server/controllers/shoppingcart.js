const { User, Product, ShoppingCart } = require('../models');
const customError = require('http-errors')

class shoppingController {
    static async add(req, res, next) {
        let ProductId = Number(req.body.id)
        try {
            let inventory = await Product.findOne({ where: { id: ProductId } })

            if (!inventory) throw customError(404, 'Product not found!')
            if (!inventory.stock) throw customError(400, 'Sorry, we\'re out of stock for that for now.')
            if (Number(inventory.stock) < Number(req.body.quantity)) throw customError(400, 'Sorry, but You can\'t buy more than the available stock.')

            let inCart = await ShoppingCart.findOne({
                where: { ProductId },
                attributes: ['id','UserId','ProductId','quantity','createdAt','updatedAt']
            })
            console.log(inCart)
            if (!inCart) {
                let newItem = {
                    UserId: req.userData.id,
                    ProductId,
                    quantity: Number(req.body.quantity)
                }
                let added = await ShoppingCart.create(newItem)

                let newStock = { stock: Number(inventory.stock) - Number(req.body.quantity) }
                let updatedStock = await Product.update(newStock, { where: { id: ProductId } })
                res.status(201).json(added)
            } else {
                let newQuantity = { quantity: Number(inCart.quantity) + Number(req.body.quantity) }
                let updatedQuantity = await ShoppingCart.update(newQuantity, { where: { id: inCart.id } })

                let newStock = { stock: Number(inventory.stock) - Number(req.body.quantity) }
                let updatedStock = await Product.update(newStock, { where: { id: ProductId } })

                res.status(200).json({ message: 'Cart updated!' })
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
            if (!inCart) throw customError(404, 'Cart item not found!')

            let inventory = await Product.findOne({ where: { id: inCart.ProductId } })
            if (!inventory) throw customError(404, 'Product not found!')

            let diff = newQuantity.quantity - Number(inCart.quantity)
            if (diff > 0) {
                if (!inventory.stock) throw customError(400, 'Sorry, we\'re out of stock for that for now.')
                if (Number(inventory.stock) < diff) throw customError(400, 'Sorry, but You can\'t buy more than the available stock.')

                let updatedQuantity = await ShoppingCart.update(newQuantity, { where: { id, UserId } })

                let newStock = { stock: Number(inventory.stock) - diff }
                let updatedStock = await Product.update(newStock, { where: { id: inCart.ProductId } })

                res.status(200).json({ message: 'Cart updated!' })
            } else if (diff < 0) {
                let updatedQuantity = await ShoppingCart.update(newQuantity, { where: { id, UserId } })

                let newStock = { stock: Number(inventory.stock) + Math.abs(diff) }
                let updatedStock = await Product.update(newStock, { where: { id: inCart.ProductId } })

                res.status(200).json({ message: 'Cart updated!' })
            } else {
                res.status(200).json({ message: 'Nothing changed!' })
            }
        } catch (err) {
            next(err)
        }
    }

    static async delete(req, res, next) {
        let id = Number(req.params.id)
        let UserId = Number(req.userData.id)
        try {
            let inCart = await ShoppingCart.findOne({ where: { id, UserId } })
            if (!inCart) throw customError(404, 'Cart item not found!')

            let inventory = await Product.findOne({ where: { id: inCart.ProductId } })
            if (!inventory) throw customError(404, 'Product not found!')

            let newStock = { stock: Number(inventory.stock) + Number(inCart.quantity) }
            let updatedStock = await Product.update(newStock, { where: { id: inCart.ProductId } })

            let deleted = await ShoppingCart.destroy({ where: { id, UserId } })
            res.status(200).json(deleted)
        } catch (err) {
            next(err)
        }
    }

    static async checkout(req, res, next) {
        let UserId = Number(req.userData.id)
        try {
            let deleted = await ShoppingCart.destroy({ where: { UserId } })
            res.status(200).json(deleted)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = shoppingController