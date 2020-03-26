'use strict'
const { Cart, User, Product, Category } = require('../models')

class Controller {
  static findAll(req, res, next) {
    Cart
      .findAll({
        include: [Product],
        where: {
          UserId: req.user
        },
      })
      .then(data => {
        if (data.length > 0) {
          res.status(200).json(data)
        } else {
          throw { status: 404, message: 'Data Not Found'}
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  }
  static findOne(req, res, next) {
        const {id} = req.params
        Cart
        .findOne({
            include: [Product],
            where: {
                id: id, UserId: req.user
            },
        })
        .then(data =>{
            if (data) {
                res.status(200).json(data)
            }else{
              throw { status: 404, message: "Data Not Found" }
            }
        })
        .catch(err =>{
            next(err)
        })
  }
  static create(req, res, next) {
    console.log(req.body)
    const UserId = req.user
    const { ProductId } = req.body         
    Cart
    .create({ 
        UserId: UserId,
        ProductId: ProductId,
        quantity: 1,
    })
    .then(data =>{
      console.log(data)
        res.status(201).json(data)
    })
    .catch(err =>{
        next(err)
    })
  }
  static update(req, res, next) {
    const { id } = req.params
    const { quantity } = req.body
    Cart
    .findOne({
      where: {
        id,
        UserId: req.user
      }
    })
      .then(data => {
        if (!data) {
          throw { status: 404, message: "Data Not Found" }
        } else {
          return Product.findOne({where:{id: data.ProductId}})
        }
    })
      .then(data => {
        if (data.stock < quantity) {
          throw { status: 400, message: `Stock only ${data.stock}`}
        } else {
          return Cart.update({ quantity: quantity }, {
            where: { id: id },
            returning: true
          })
        }
    })
    .then(data =>{
      if (data[0] === 0) {
        throw {status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json(data[1][0])
      }
    })
    .catch(err =>{
        next(err)
    })
  }
  static destroy(req, res, next){
    const {id} = req.params
    Cart
    .destroy({ where: { id, UserId: req.user} })
    .then(data =>{
      if (!data) {
        throw{status: 404, message: "Data Not Found"}
      } else {
        res.status(200).json("Cart hasbeen removed")
      }
    })
    .catch(err =>{
        next(err)
    })
  }
}

module.exports = Controller