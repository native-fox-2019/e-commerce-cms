const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_token_admin = ''
let access_token_user = ''
let productId = 1

beforeAll(done => {
    queryInterface.bulkDelete('Users', {})
    .then(() => {
        return User.create({
            username: 'admin',
            email: 'admin@mail.com',
            password: 'admin',
            role: 'admin'
        })
    })
    .then(result => {
        console.log('Admin Created w/ ID:', { id: result.id })
        access_token_admin = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
        console.log(access_token_admin)
        return User.create({
            username: 'user',
            email: 'user@mail.com',
            password: 'user',
            role: 'user'
        })
    })
    .then(result => {
        console.log('User Created w/ ID:', { id: result.id })
        access_token_user = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
        return queryInterface.bulkDelete('Products', {})
    })
    .then(() => {
        return Product.create({
            id: productId,
            name: 'Product 1',
            image_url: 'https://www.products.com/image/1.jpg',
            price: 10000,
            stock: 10
        })
    })
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Delete Product:', () => {
    describe('Delete Success:', () => {
        it('should return 200:', (done) => {
            request(app)
            .delete(`/product/${productId}`)
            .set('access_token', access_token_admin)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(200)
                expect(body).toBe(1)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Delete Fail:', () => {
        it('should return 401 (Unauthenticated):', (done) => {
            request(app)
            .delete(`/product/${productId}`)
            // .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(401)
                expect(body.message).toBe('You must log in first!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 403 (Unauthorized):', (done) => {
            request(app)
            .delete(`/product/${productId}`)
            .set('access_token', access_token_user)
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(403)
                expect(body.message).toBe('You don\'t have access to this!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 404 (Not Found):', (done) => {
            request(app)
            .delete(`/product/${2}`)
            .set('access_token', access_token_admin)
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(404)
                expect(body.message).toBe('Record not Found!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})