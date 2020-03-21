const {
    Product,
    User
} = require('../models')

class ProductController {
    static create(request, response, next) {
        let data_product = {
            name: request.body.name,
            image_url: request.body.image_url,
            price: request.body.price,
            stock: request.body.stock,
            user_id: request.userData.id
        }
        Product.create(data_product, {
                individualHooks: true
            })
            .then(result => {
                response.status(201).json({
                    data: result,
                    message: 'Create Task Successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static read(request, response, next) {
        let data_product
        Product.findAll({
                where: {
                    user_id: request.userData.id
                }
            })
            .then(result => {
                data_product = result
                return User.findOne({
                    where: {
                        email: request.userData.email
                    }
                })
            })
            .then(result => {
                let user_info = {
                    name: result.name,
                    is_admin: result.is_admin,
                    superUser: result.superUser
                }
                response.status(200).json({
                    data: data_product,
                    user: user_info,
                    message: 'Read Successfully'
                })

            })
            .catch(err => {
                next(err)
            })
    }

    static readById(request, response, next) {
        Product.findOne({
                where: {
                    id: request.params.id
                }
            })
            .then(result => {
                if (result) {
                    response.status(200).json({
                        data: result,
                        message: 'Read Successfully'
                    })
                } else {
                    throw {
                        status_code: 404,
                        message: 'Data Not Found'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static update(request, response, next) {
        let data_product = {
            name: request.body.name,
            image_url: request.body.image_url,
            price: request.body.price,
            stock: request.body.stock,
            user_id: request.userData.id
        }
        Product.findOne({
                where: {
                    id: request.params.id
                },
                individualHooks: true
            })
            .then(result => {
                if (result) {
                    return Product.update(data_product, {
                        where: {
                            id: request.params.id
                        }
                    })
                } else {
                    throw {
                        status_code: 404,
                        message: 'Data Not Found'
                    }
                }
            })
            .then(result => {
                response.status(200).json({
                    message: 'Update Successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static delete(request, response, next) {
        Product.destroy({
                where: {
                    id: request.params.id
                }
            })
            .then(result => {
                response.status(200).json({
                    message: 'Delete Successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = ProductController