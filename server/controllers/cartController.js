const {Item, Cart, User} = require('../models')
const { Op } = require('sequelize')

class Controller {

    static create(req, res, next) {
        const ItemId = req.params.id
        const quantity = Number(req.body.quantity)

        let itemPrice, newData
        
        // Item stock validation
        Item.findOne({ where: { id: ItemId }})
            .then(item => {
                console.log('Trying to add into cart:', item)
                if (!item) throw ({ status: 404, message: 'Item not found!'})
                if (item.stock < quantity) throw ({ status: 400, message: 'There is not enough stock for this order!'})
                
                // Checks whether the item is already in cart or not
                itemPrice = item.price
                const option = {
                    where: {
                        UserId: req.userData.id,
                        ItemId: ItemId,
                        status: 'pending',
                    }
                }
                return Cart.findOne(option)
            })
            .then(cart => {
                console.log('Trying to find existing cart information...')
                // If the cart for that item already exists, update the quantity and total price
                if (cart && cart.status == 'pending') {
                    // console.log('A cart already exists for that item:', cart)
                    const newQuantity = cart.quantity + quantity
                    newData = {
                        id: cart.id,
                        UserId: req.userData.id,
                        ItemId: ItemId,
                        quantity: newQuantity,
                        totalPrice: (itemPrice * newQuantity),
                        status: cart.status,
                    }
                    // console.log('It will be updated with this:', newData)
                    // console.log(`Now updating to cart ID ${cart.id}`)
                    return Cart.update(newData, { where: { id: cart.id }})
                } else {
                    const obj = {
                        UserId: req.userData.id,
                        ItemId: ItemId,
                        quantity: quantity,
                        totalPrice: (itemPrice * quantity),
                        status: 'pending'
                    }
                    // console.log('The cart for this item has not existed yet', obj)
                    return Cart.create(obj)
                }
            })
            .then(data => {
                if (newData) {
                    data = newData
                    res.status(201).json(data)
                } else {
                    res.status(201).json(data)
                }
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        const option = {
            where: { id: req.params.id },
            include: [{ model: Item, as: 'Item'}]
        }
        Cart.findOne(option)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static showUserCarts(req, res, next) {
        // Only for customer
        const option = {
            where: { UserId: req.userData.id },
            include: [{ model: Item, as: 'Item'}],
        }
        Cart.findAll(option)
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static showUserCartsHistory(req, res, next) {
        // Only for customer
        const option = {
            where: {
                UserId: req.userData.id,
                status: { [Op.or]: ['checkout', 'delivered'] },
            },
            include: [{ model: Item, as: 'Item'}, {model: User, as: 'User'}]
        }
        Cart.findAll(option)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }

    static showUserPendingCarts(req, res, next) {
        // Only for customer
        const option = {
            where: { UserId: req.userData.id, status: 'pending'},
            include: [{ model: Item, as: 'Item'}]
        }
        Cart.findAll(option)
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static showAllCustomerCarts(req, res, next) {
        // Only for admins
        Cart.findAll({ include: [{ model: Item, as: 'Item'}, {model: User, as: 'User'}]})
            .then(carts => {
                res.status(200).json(carts)
            })
            .catch(next)
    }

    static update(req, res, next) {
        // Updates quantity or status of the order
        const id = Number(req.params.id)
        const update = {}
        let checkOutQty, data
        // req.body.status, req.body.quantity
        for (let key in req.body) { update[key] = req.body[key] }


        // When checkout
        if (update.status) {
            Cart.findOne({ where: { id: id }})
                .then(cart => {
                    if (!cart) throw ({message: 'Cart data not found'})
                    checkOutQty = cart.quantity
                    return Item.findOne({ where: { id: cart.ItemId }})
                })
                .then(item => {
                    if (item.stock - checkOutQty < 0) throw ({status: 400, message: 'There is not enough stock for this order!'})
                    
                    // Data response //
                    data = {
                        name: item.name,
                        description: item.description,
                        quantity: checkOutQty,
                        totalPrice: checkOutQty * item.price,
                    }
                    let obj = { stock: item.stock - checkOutQty }
                    return Item.update(obj, { where: { id: item.id }})
                })
                .then(() => {
                    let obj = { status: update.status }
                    return Cart.update(obj, { where: { id: id }})
                })
                .then(() => {
                    res.status(200).json(data)
                })
                .catch(next)

        // Changes cart quantity without checkout
        } else if (update.quantity) {
            Cart.findOne({ where: { id: id }})
                .then(cart => {
                    if (!cart) throw ({message: 'Cart data not found'})
                    return Item.findOne({ where: { id: cart.ItemId }})
                })
                .then(item => {
                    console.log('Item stock:', item.stock)
                    console.log('Update quantity:', update.quantity)
                    if (item.stock < Number(update.quantity)) throw ({status: 400, message: 'There is not enough stock for this order!'})

                    // Response data //
                    data = {
                        id: id,
                        ItemId: item.id,
                        UserId: req.userData.id,
                        quantity: Number(update.quantity),
                        totalPrice: item.price * update.quantity,
                    }
                    console.log('Cart is going to update with:', data)
                    return Cart.update(data, { where: { id: id }})
                })
                .then(() => {
                    console.log('Edit quantity succeeded!')
                    res.status(200).json(data)
                })
                .catch(next) 
        }
    }

    static destroy(req, res, next) {
        const option = { where: { id: req.params.id }}
        Cart.findOne(option)
        .then(data => {
            if (data) {
                Cart.destroy(option)
                .then(() => res.status(200).json(data))
                .catch(next)
            } else {
                throw {status: 404, message: 'Data not found!'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller