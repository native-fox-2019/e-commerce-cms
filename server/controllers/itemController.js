const { Item } = require('../models')

class Controller {

    static create(req, res, next) {
        let obj = {
            name: req.body.name,
            description: req.body, description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.userData.id
        }
        Item.create(obj)
        .then(data => res.status(201).json({ data }))
        .catch(next)
    }

    static findAll(req, res, next) {
        Item.findAll()
        .then(data => res.status(200).json({ data }))
        .catch(next)
    }

    static findOne(req, res, next) {
        let option = { where: { id: req.params.id }}
        Item.findOne(option)
        .then(result=>{
            if(result){
                res.status(200).json({ result })
            } else{
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static findUserItem(req, res, next) {
        let option = { where: { UserId: req.params.id }}
        Item.findAll(option)
        .then(result=>{
            if(result){
                res.status(200).json({ result })
            } else{
                throw {status: 404, message: 'Data not found'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static update(req, res, next) {
        let obj = {
            name: req.body.name,
            description: req.body, description,
            image_url: req.body.image_url,
            price: req.body.price,
            stock: req.body.stock,
            UserId: req.userData.id
        }
        let option = { where: { id: req.params.id }}

        Item.update(obj, option)
        .then(current => {
            if (success[0]) {
                res.status(200).json(obj)
            } else {
                throw {status: 404, message: 'Data not found!'}
            }
        })
        .catch(err => {
            if (err) {
                res.status(400).json({ err })
            } else {
                res.status(500).json({ err })
            }
        })
    }

    static destroy(req, res, next) {
        let option = { where: { id: req.params.id }}

        Item.findOne(option)
        .then(current => {
            if (current) {
                Item.destroy(option)
                .then((data) => res.status(200).json({ data }))
                .catch(next)
            } else {
                throw {status: 404, message: 'Data not found!'}
            }
        })
        .catch(next)
    }
}

module.exports = Controller