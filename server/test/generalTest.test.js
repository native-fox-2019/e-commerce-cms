const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User, Product } = require('../models')
const { create } = require('../helpers/token')


const NAME = 'Robert'
const EMAIL = 'robert@gmail.com'
const PASS = 'robert'
let TOKEN

const PRODUCT_NAME = 'Black Box'
const IMG_URL = 'www.google.com'
const PRICE = 100000
const STOCK = 100
let ID

beforeAll (done => {
    User.create({
        name: 'Random',
        email: 'www.bing.com',
        password: 'fuckoff',
        role:'admin'
    })
    .then(data => {
        TOKEN = create({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
        })
        done()
    })
})

afterAll(done => {
    queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch((err) => done(err))
})

// CREATE (Register)
describe('register new user', () => {
    describe('success registering', () => {
        it('success registering new user', (done) => {
            request(app)
                .post(`/users/register`)
                .send({
                    name: NAME,
                    email: EMAIL,
                    password: PASS
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token',response.body.access_token)
                    done()
                })
        })
    })
    describe('fail registering', () => {
        it('name is null / empty', (done) => {
            request(app)
                .post(`/users/register`)
                .send({
                    name: '',
                    email: 'empty@gmail.com',
                    password: PASS
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Name cannot be empty')
                    done()
                })
        })
        it('email is null / empty', (done) => {
            request(app)
                .post(`/users/register`)
                .send({
                    name: 'Hodor',
                    email: '',
                    password: PASS
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Email cannot be empty')
                    done()
                })
        })
        it('password is null / empty', (done) => {
            request(app)
                .post(`/users/register`)
                .send({
                    name: 'Hodor',
                    email: 'hodor@gmail.com',
                    password: ''
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toContain('Password cannot be empty')
                    done()
                })
        })
    })
})

// LOGIN USER
describe('Login user', () => {
    describe('success login', () => {
        it('do login', (done) => {
            request(app)
                .post(`/users/login`)
                .send({
                    email: 'www.bing.com',
                    password: 'fuckoff'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token', response.body.access_token)
                    done()
                })
        })
    })
    describe('failed login', () => {
        it('wrong email', (done) => {
            request(app)
                .post(`/users/login`)
                .send({
                    email: 'www.bang.com',
                    password: 'fuckoff'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Invalid Email / Password')
                    done()
                })
        })
        it('wrong password', (done) => {
            request(app)
                .post(`/users/login`)
                .send({
                    email: 'www.bing.com',
                    password: 'fuckoffsdsd'
                })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg', 'Invalid Email / Password')
                    done()
                })
        })
    })
})






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
                .set({access_token:TOKEN})
                .send({
                    name: PRODUCT_NAME,
                    image_url: IMG_URL,
                    price: PRICE,
                    stock: STOCK
                })
                .then(response => {
                    const { body, status } = response
                    ID = body.id
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('id')
                    expect(body).toHaveProperty('name', PRODUCT_NAME)
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
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
                .set({access_token:TOKEN})
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('msg', 'Cannot be found')
                    done()
                })
        })
    })
})