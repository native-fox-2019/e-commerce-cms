const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll (done => {
    queryInterface
        .bulkDelete('Products', {})
        .then(() => done())
        .catch((err) => done(err))
})

//CREATE
describe('adding new product', () => {
    describe('Success', () => {
        it('success adding new product',  (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: 'Black box',
                    image_url: 'www.google.com',
                    price: 10000,
                    stock: 100
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id')
                    expect(body).toHaveProperty('name', 'Black box')
                    expect(body).toHaveProperty('image_url', 'www.google.com')
                    expect(body).toHaveProperty('price', 10000)
                    expect(body).toHaveProperty('stock', 100)
                    done()
                })
        })
    })
    describe('Failed', () => {
        it('Name empty / null', (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: '',
                    image_url: 'www.google.com',
                    price: 10000,
                    stock: 100
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Name cannot be empty')
                    done()
                })
        })
        it('Image url empty / null', (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: 'Black Box',
                    image_url: '',
                    price: 10000,
                    stock: 100
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Image url cannot be empty')
                    done()
                })
        })
        it('Price empty / null', (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: 'Black Box',
                    image_url: 'www.google.com',
                    price: '',
                    stock: 100
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Price cannot be empty')
                    done()
                })
        })
        it('Stock empty / null', (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: 'Black Box',
                    image_url: 'www.google.com',
                    price: 10000,
                    stock: ''
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Stock cannot be empty')
                    done()
                })
        })
    })
})

//READ
describe('showing all products', () => {
    describe('success showing', () => {
        it('get all product list', (done) => {
            request(app)
                .get('/products')
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    done()
                })
        })
    })
})

//UPDATE
describe('updating product', () => {
    describe('success updating', () => {
        it('updating product', () => {
            request
        })
    })
})