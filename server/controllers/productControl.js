const {Product} = require('../models')


class ProductControl{
    static show(req, res, next){
        Product.findAll()
        .then(data=> res.status(200).json(data))
        .catch(err=>next(err))
    }

    static myshow(req, res, next){
        Product.findAll({
            where: {userId: req.userdata.id}
        })
        .then(data=> res.status(200).json(data))
        .catch(err=>next(err))
    }

    static myshowone(req, res, next){
        Product.findOne({
            where: {id: req.params.id}
        })
        .then(data=> res.status(200).json(data))
        .catch(err=>next(err))
    }

    static create(req, res, next){
        if(req.body.price<=0){
            res.status(400).json(`price must be bigger than 0`)
        } else if (req.body.stock<=0){
            res.status(400).json(`stock must be bigger than 0`)
        } else {
            let newData = {
                name: req.body.name,
                image_url: req.body.image_url,
                price: req.body.price,
                stock: req.body.stock,
                userId: req.userdata.id
            }
            Product.create(newData)
            .then(data=>res.status(201).json(`new data has been saved`))
            .catch(err=>next(err))
        }
    }

    static edit(req, res, next){
        let searchId = req.params.id
        if(req.body.price<=0){
            res.status(400).json(`price must be bigger than 0`)
        } else if (req.body.stock<=0){
            res.status(400).json(`stock must be bigger than 0`)
        } else {
            Product.update(req.body, {
                where: {id: searchId}
            })
            .then(data=>{
                res.status(200).json(`data with id : ${searchId} has been updated`)
            })  
            .catch(err=>next(err))
        }
    }

    static delete(req, res, next){
        let searchId =  req.params.id
        Product.destroy({
            where : { id: searchId}
        })
        .then(data=>{
            if(data!==0){
                res.status(200).json(`data with id ${searchId} has been deleted`)
            } else {
                res.status(404).json("no data is deleted")
            }
        })
        .catch(err=> next(err))
    }
}

module.exports = ProductControl