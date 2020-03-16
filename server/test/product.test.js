const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { Product } = require('../models')


const NAME = 'Black Box'
const IMG_URL = 'www.google.com'
const PRICE = 100000
const STOCK = 100
const ID = 1

beforeAll (done => {
    Product.create({
        name: 'Random',
        image_url: 'www.bing.com',
        price: 1000,
        stock: 5
    })
    .then(data => {
        done()
    })
})

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
                    expect(body).toHaveProperty('msg','Product updated')
                    done()
                })
        })
    })
    describe('fail updating', () => {
        it('name is empty', (done) => {
            request(app)
                .put(`/products/edit/${ID}`)
                .send({
                    name:'',
                    image_url:'www.yahoo.com',
                    price: 50000,
                    stock: 30
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Name cannot be empty')
                    done()
                })
        })
        it('Image url is empty', (done) => {
            request(app)
                .put(`/products/edit/${ID}`)
                .send({
                    name:'Blue Box',
                    image_url:'',
                    price: 50000,
                    stock: 30
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Image url cannot be empty')
                    done()
                })
        })
        it('Price is empty', (done) => {
            request(app)
                .put(`/products/edit/${ID}`)
                .send({
                    name:'Blue Box',
                    image_url:'www.yahoo.com',
                    price: '',
                    stock: 30
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Price cannot be empty')
                    done()
                })
        })
        it('Stock is empty', (done) => {
            request(app)
                .put(`/products/edit/${ID}`)
                .send({
                    name:'Blue Box',
                    image_url:'www.yahoo.com',
                    price: 50000,
                    stock: ''
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Stock cannot be empty')
                    done()
                })
        })
        it('Non exist ID', (done) => {
            request(app)
                .put(`/products/edit/100`)
                .send({
                    name:'Blue Box',
                    image_url:'www.yahoo.com',
                    price: 50000,
                    stock: 100
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('msg', 'Cannot be found')
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
                    expect(body).toHaveProperty('msg', 'Product deleted')
                    done()
                })
        })
    })
    describe('fail deleting product', () => {
        it('delete unexisting product', (done) => {
            request(app)
                .delete(`/products/delete/100`)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('msg', 'Cannot be found')
                    done()
                })
        })
    })
})