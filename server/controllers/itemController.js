const { Item } = require('../models')

class Controller {

    static create(req, res, next) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.userData.id,
        }
        Item.create(obj)
        .then(data => res.status(201).json(data))
        .catch(next)
    }

    static findAll(req, res, next) {
        Item.findAll()
        .then(data => res.status(200).json(data))
        .catch(next)
    }

    static findOne(req, res, next) {
        const option = { where: { id: req.params.id }}
        Item.findOne(option)
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(next)
    }

    static findUserItem(req, res, next) {
        const option = { where: { UserId: req.params.id }}
        Item.findAll(option)
        .then(result=>{
            if(result){
                res.status(200).json(result)
            } else{
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(next)
    }

    static update(req, res, next) {
        const obj = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.userData.id,
        }
        const option = { where: { id: req.params.id }}
        Item.update(obj, option)
        .then((data) => res.status(200).json(data))
        .catch(next)
    }

    static destroy(req, res, next) {
        const option = { where: { id: req.params.id }}
        Item.findOne(option)
        .then(current => {
            if (current) {
                Item.destroy(option)
                .then((data) => res.status(200).json(data))
                .catch(next)
            } else {
                throw {status: 404, message: 'Data not found!'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller