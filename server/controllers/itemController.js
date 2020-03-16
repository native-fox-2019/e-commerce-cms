const { Item } = require('../models')

class Controller {

    static create(req, res, next) {
        let obj
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
        .then(data => res.status(200).json({ data }))
        .catch(next)
    }

    static findUserItem(req, res, next) {
        let option = { where: { UserId: req.params.id }}
        Item.findAll(option)
        .then(data => res.status(200).json({ data }))
        .catch(next)
    }

    static update(req, res, next) {
        let obj
        let option = { where: { id: req.params.id }}

        Item.update(obj, option)
        .then(current => {
            if (!current) throw {}

        })
        .catch(next)
    }

    static destroy(req, res, next) {
        let option = { where: { id: req.params.id }}
        Item.destroy(option)
        .then(destroyedData => res.status(200).json({ destroyedData }))
        .catch(next)
    }
}

module.exports = Controller