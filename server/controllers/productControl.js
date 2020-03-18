const {Product} = require('../models')

class ProductControl{
    static show(req, res, next){
        Product.findAll()
        .then(data=> res.status(200).json(data))
        .catch(err=>res.status)
    }

    static create(req, res, next){
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

    static edit(req, res, next){
        let searchId = req.params.id
        console.log(searchId+"<<<id prod")
        Product.update(req.body, {
            where: {id: searchId}
        })
        .then(data=>{
            res.status(200).json(`data with id : ${searchId} has been updated`)
            
        })  
        .catch(err=>next(err))
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