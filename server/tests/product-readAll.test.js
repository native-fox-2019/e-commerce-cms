const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_token_admin = ''
let access_token_user = ''

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
        return queryInterface.bulkInsert('Products', [{
            name: 'Product 1',
            image_url: 'https://www.products.com/image/1.jpg',
            price: 10000,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'Product 2',
            image_url: 'https://www.products.com/image/2.jpg',
            price: 20000,
            stock: 20,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            name: 'Product 3',
            image_url: 'https://www.products.com/image/3.jpg',
            price: 30000,
            stock: 30,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    })
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Read All Products:', () => {
    describe('Read Success:', () => {
        it('should return 200:', (done) => {
            request(app)
            .get('/product')
            .set('access_token', access_token_admin)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBe(true)
                expect(body.length).toBe(3)
                expect(typeof body[0]).toBe('object')
                expect(body[0] !== null).toBe(true)
                expect(body[0]).toHaveProperty('name')
                expect(body[0].name).toBe('Product 1')
                expect(body[0]).toHaveProperty('image_url')
                expect(body[0].image_url).toBe('https://www.products.com/image/1.jpg')
                expect(body[0]).toHaveProperty('price')
                expect(body[0].price).toBe(10000)
                expect(body[0]).toHaveProperty('stock')
                expect(body[0].stock).toBe(10)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Read Fail:', () => {
        it('should return 401 (Unauthenticated):', (done) => {
            request(app)
            .get('/product')
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
            .get('/product')
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
    })
})