const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


const NAME = 'Black Box'
const IMG_URL = 'www.google.com'
const PRICE = 100000
const STOCK = 100
const ID = 1


afterAll (done => {
    queryInterface
        .bulkDelete('Products', {})
        .then(() => done())
        .catch((err) => done(err))
})

// CREATE
describe('adding new product', () => {
    describe('Success', () => {
        it('success adding new product',  (done) => {
            request(app)
                .post('/products/add')
                .send({
                    name: NAME,
                    image_url: IMG_URL,
                    price: PRICE,
                    stock: STOCK
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id')
                    expect(body).toHaveProperty('name', NAME)
                    expect(body).toHaveProperty('image_url', IMG_URL)
                    expect(body).toHaveProperty('price', PRICE)
                    expect(body).toHaveProperty('stock', STOCK)
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

// READ
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
        it('updating product', (done) => {
            request(app)
                .put(`/products/edit/${ID}`)
                .send({
                    name:'Blue Box',
                    image_url:'www.yahoo.com',
                    price: 50000,
                    stock: 30
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(201)
                    done()
                })
        })
    })
})

//DELETE
describe('deleting product', () => {
    describe('success deleting product', () => {
        it('delete product', (done) => {
            request(app)
                .delete(`/products/delete/${ID}`)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    done()
                })
        })
    })
})