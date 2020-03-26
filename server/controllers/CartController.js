const Model = require('../models')
const Cart = Model.Cart
const User = Model.User
const Product = Model.Product

class CartController {
    static addCart(req, res, next){
        let userId = req.userData.id
        let obj = {
            UserId : userId,
            ProductId : req.body.id,
            amount : req.body.amount,
            total : req.body.total
        }
        Cart.findOne({where : {UserId : userId, ProductId : req.body.id}})
        .then(response=>{
            if(response === null){
                return Cart.create(obj)
            } else {
                throw {
                    status : 400,
                    error : `Already in your Cart`
                }
            }
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err=>{
            next(err)
        })
    }

    static findCart(req, res, next){
        let id = req.userData.id
        User.findOne({where : {id : id}, include : [{ model : Product}]})
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
    }

    static deleteCart(req, res, next){
        let userId = req.userData.id
        let productId = req.params.id
        Cart.destroy({where : {UserId : userId, ProductId : productId}})
        .then(()=>{
            res.status(201).json(`Delete Success`)
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static findDelete(req, res, next){
        let productId = req.params.id
        let userId = req.userData.id
        let amount = req.body.amount
        let newStock = 0
        Product.findOne({where : { id : productId }})
        .then(data=>{
            if(data.stock >= amount && amount <= data.stock){
                newStock = data.stock - amount
                let obj = {
                    stock : newStock
                }
                return Product.update(obj, {where : { id : productId }})
            } else {
                throw {
                    status : 400,
                    error : `Sorry this item is run out of stock`
                }
            }
        })
        .then(()=>{
            return Cart.destroy({where : { UserId : userId, ProductId : productId }})
        })
        .then(()=>{
            res.status(200).json(`Success delete cart and update stock`)
        })
        .catch(err=>{
            next(err)
        })
    }

    static editPlus(req, res, next){
        let productId = req.params.id
        let amount = Number(req.body.amount)
        let price = Number(req.body.price)
        let userId = req.userData.id
        let amounts = amount + 1
        let obj = {
            amount : amounts,
            total : amounts * price
        }
        Cart.update(obj, { where : { UserId : userId , ProductId : productId} })
        .then(()=>{
            res.status(200).json(`Success add quantity`)
        })
        .catch(err=>{
            next(err)
        })
    }

    static editMinus(req, res, next){
        let productId = req.params.id
        let amount = Number(req.body.amount)
        let price = Number(req.body.price)
        let userId = req.userData.id
        let amounts = amount - 1
        let obj = {
            amount : amounts,
            total : amounts * price
        }
        if(amounts > 0){
        Cart.update(obj, { where : { UserId : userId , ProductId : productId} })
        .then(()=>{
            res.status(200).json(`Success reduce quantity`)
        })
        .catch(err=>{
            next(err)
        })
        } else {
            throw {
                status : 400,
                error : `Cannot less than one`
            }
        }
    }
}

module.exports = CartController