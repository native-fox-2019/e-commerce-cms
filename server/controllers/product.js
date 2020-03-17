const { products } = require('../models')

class productsController {

    static addProduct(req, res) {
        console.log("masuk", req.payloadUser)
        let input = {
            name: req.body.name,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            userId: req.payloadUser.data.id
        }
        products.create(input)
            .then(data => {
                res.status(201).json(data)
            }).catch(err => {
                res.status(500).json(err)
            })
    }

    static getAllProducts(req, res) {
        let userId = {
            where: {
                userId: req.payloadUser.data.id
            }
        }
        products.findAll(userId)
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(404).json({
                    msg: "data is not found",
                    error: err
                })
            })
    }

    static getProduct(req, res) {
        let idProduct = {
            where: {
                id: req.params.id
            }
        }
        products.findOne(idProduct)
            .then(data => {
                res.status(200).json(data)
            }).catch(data => {
                res.status(404).json({
                    msg: "data is not found",
                    error: err
                })
            })
    }

    static updateProduct(req, res) {
        let idProduct = {
            where: {
                id: req.params.id
            }
        }
        let input = {
            name:req.body.name,
            image_url:req.body.image_url,
            price:req.body.price,
            stock:req.body.stock
        }
        products.update(input,idProduct)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json({
                    msg: "update fail",
                    error: err
                })
            })
    }

    static deleteProduct(req,res){
        let idProduct = {
            where:{
                id: req.params.id
            }
        }

        products.destroy(idProduct)
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(404).json({
                msg:"data is not found",
                error:err
            })
        })
    }
}

module.exports = productsController