const model = require(`../models`)
const createError = require(`../helpers/bcrypt`)

class productController {
    static create(req, res, next) {
        var {name, image_url, price, stock} = req.body

        model.Produce.create({
            name,
            image_url,
            price,
            stock,
            UsersId: req.user.id
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(next)
    }
    
    static read(req, res, next) {
        model.Produce.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(next)
    }
    
    static update(req, res, next) {
        var {name, image_url, price, stock} = req.body

        model.Produce.update({
            name,
            image_url,
            price,
            stock
        }, {
            where: {
                id: req.user.id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `Item of id ${req.user.id} not found`)
                }
            })
            .catch(next)
    }
    
    static delete(req, res, next) {
        model.Produce.destroy({
            where: {
                id: req.user.id
            }
        })
            .then(data => {
                if(data) {
                    res.status(200).json(data)
                } else {
                    throw createError(404, `Item of id ${req.user.id} not found`)
                }
            })
            .catch(next)
    }
}

module.exports = productController