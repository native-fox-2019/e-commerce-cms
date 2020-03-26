require('dotenv').config()
const {
    User
} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Sequelize.Op

class UserController {
    static login(request, response, next) {
        let data_login = {
            email: request.body.email,
            password: request.body.password
        }
        let data_user
        User.findOne({
                where: {
                    email: data_login.email
                }
            })
            .then(result => {
                if (result) {
                    data_user = {
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        is_admin: result.is_admin
                    }
                    return bcrypt.compare(data_login.password, result.password)
                } else {
                    throw {
                        status_code: 404,
                        message: 'You Are not Registered'
                    }
                }
            })
            .then(result => {
                if (result) {
                    let token = jwt.sign(data_user, process.env.JWT_SECRET)
                    response.status(200).json({
                        access_token: token,
                        message: 'Login Successfully'
                    })
                } else {
                    throw {
                        status_code: 400,
                        message: 'Wrong Password'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static registration(request, response, next) {
        let data_regis = {
            name: request.body.name,
            email: request.body.email,
            is_admin: false,
            superUser: false,
            password: request.body.password
        }
        User.findOne({
                where: {
                    email: data_regis.email
                }
            })
            .then(result => {
                if (result) {
                    throw {
                        status_code: 400,
                        message: 'Email Already Registered'
                    }
                } else {
                    return User.create(data_regis)
                }
            })
            .then(result => {
                let token = jwt.sign({
                        id: result.id,
                        name: result.name,
                        email: result.email,
                        is_admin: result.is_admin
                    },
                    process.env.JWT_SECRET
                )
                response.status(201).json({
                    access_token: token,
                    message: 'Create new User Successfully'
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static addAdmin(request, response, next) {
        let id_addAdmin = request.params.id
        let data_user
        User.findByPk(id_addAdmin)
            .then(result => {
                if (result) {
                    if (result.is_admin) {
                        throw {
                            status_code: 400,
                            message: 'This User is Already a Member'
                        }
                    } else {
                        data_user = result
                        return User.update({
                            is_admin: true
                        }, {
                            where: {
                                id: id_addAdmin
                            }
                        })
                    }
                } else {
                    throw {
                        status_code: 404,
                        message: 'User Not Found'
                    }
                }
            })
            .then(result => {
                response.status(200).json({
                    message: `User ${data_user.name} is Member Now`
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static removeAdmin(request, response, next) {
        let id_removeAdmin = request.params.id
        let data_user
        User.findByPk(id_removeAdmin)
            .then(result => {
                if (result) {
                    if (result.is_admin) {
                        data_user = result
                        return User.update({
                            is_admin: false
                        }, {
                            where: {
                                id: id_removeAdmin
                            }
                        })
                    } else {
                        throw {
                            status_code: 400,
                            message: 'This User is Already Non Member'
                        }
                    }
                } else {
                    throw {
                        status_code: 404,
                        message: 'User Not Found'
                    }
                }
            })
            .then(result => {
                response.status(200).json({
                    message: `User ${data_user.name} is Non Member Now`
                })
            })
            .catch(err => {
                next(err)
            })
    }

    static listAll(request, response, next) {
        User.findAll({
                where: {
                    superUser: false
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            .then(result => {
                response.status(200).json(result)
            })
            .catch(err => {
                next(err)
            })
    }

}

module.exports = UserController