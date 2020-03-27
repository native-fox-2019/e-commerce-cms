const { Product } = require('../models')

class ProductController{
  static create(req, res, next){
    let { name, image_url, price, stock, category } = req.body
    let newProduct = {
      name,
      image_url,
      price,
      stock,
      category
    }
    Product.create(newProduct)
    .then(data => {
      if(data){
        res.status(201).json(data)
      }else{
        res.status(400).json({message: "Error saving data!"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static getAll(req, res, next){
    Product.findAll()
    .then(products => {
      if(products.length > 0){
        res.status(200).json(products)
      }else{
        res.status(404).json({message: "Sorry all item out of stock!"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static getOne(req, res, next){
    let {id} = req.params
    Product.findByPk(id)
    .then(product => {
      if(product){
        res.status(200).json(product)
      }else{
        res.status(404).json({message: "Product not found!"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static getByCategory(req, res, next){
    let category = req.query.category
    Product.findAll({
      where: {
        category
      }
    })
    .then(products => {
      if(products.length>0){
        res.status(200).json(products)
      }else{
        next({status: 404, message: `Product by caterogy ${category} not found`})
      }
    })
    .catch(err => {
      next(err)
    })
  }

  static update(req, res, next){
    let {id} = req.params
    let { name, image_url, price, stock, category } = req.body
    let newData = {
      name,
      image_url,
      price,
      stock,
      category
    }
    Product.findByPk(id)
    .then(product => {
      if(product){
        return Product.update(newData, {
          where: {
            id
          }
        })
      }else{
        res.status(404).json({message: "Product not found!"})
      }
    })
    .then(updated => {
      res.status(200).json({message: "Product has been updated!"})
    })
    .catch(err => {
      next(err)
    })
  }

  static delete(req, res, next){
    let {id} = req.params
    //validasi barangnya dulu
    Product.destroy({
      where: {
        id
      }
    })
    .then(deleted => {
      if(deleted){
        res.status(200).json({message: "Product has been deleted!"})
      }else{
        res.status(404).json({message: "Product not found"})
      }
    })
    .catch(err => {
      next(err)
    })
  }

}

module.exports = ProductController