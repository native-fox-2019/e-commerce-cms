const app = require('../app')
const request = require('supertest')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let test_adminAccessToken
let test_userAccessToken
const test_productName = 'test product'
const test_productImageUrl = 'www.google.com'
const test_productPrice = 1000000
const test_productStock = 1
let test_productId
let test_falseProductId

beforeAll(async done  => {
    try {
        let admin = await User.create({
            name: "bambang",
            email: "bambang@gmail.com",
            password: "bambang",
            role: "admin"
        })
        let user = await User.create({
            name: "pamungkas",
            email: "pamungkas@gmail.com",
            password: "pamungkas",
            role: "user"
        })
        let adminToken = generateToken({ id: admin.id, email: admin.email, role: admin.role })
        let userToken = generateToken({ id: user.id, email: user.email, role: user.role })
        test_adminAccessToken = adminToken
        test_userAccessToken = userToken
        done()
    } catch (err) {
        done(err)
    }
    
})

afterAll(done => {
    queryInterface.bulkDelete('Products')
        .then(() => done())
        .catch(err => done(err))
})

// Add Product
describe('Add new product', () => {
    describe('Success', () => {
        it('Should return 201 and object (newProduct, message)', async done => {
            try {
                const { body, status } = await request(app)
                    .post('/products')
                    .set('access_token', test_adminAccessToken)
                    .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(201)
                expect(body).toHaveProperty('newProduct')
                expect(body).toHaveProperty('message')
                expect(body.message).toBe('Added a new product!')
                test_productId = body.newProduct.id
                test_falseProductId = Number(body.newProduct.id) + 5
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail', () => {
        it('Should return 403 and object(status, message), when user not logged in', async done => {
            try {
                const { body, status } = await request(app).post('/products').send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(403)
                expect(body).toHaveProperty('message')
                expect(body.message).toBe('You need to login first')
                done()
            } catch (err) {
                done(err)
            }
        })

        it('Should return 400 and object(status, message), when name is null or empty', async done => {
            try {
                const { body, status } = await request(app)
                .post('/products')
                .set('access_token', test_adminAccessToken)
                .send({
                    name: '',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe('Product Name can not be empty')
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object(status, message), when imageUrl is null or empty', async done => {
            try {
                const { body, status } = await request(app)
                .post('/products')
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: '',
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe('Product Image Url can not be empty')
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object(status, message), when price is negatives', async done => {
            try {
                const { body, status } = await request(app)
                .post('/products')
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: -1,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe("Product Price can not be negatives")
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object(status, message), when stock is negatives', async done => {
            try {
                const { body, status } = await request(app)
                .post(`/products`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: -1
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe("Product Stock can not be negatives")
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

// Get all products
describe('Get all products', () => {
    describe('Success', () => {
        it('Should return 200 and array of objects', async done => {
            try {
                const { body, status } = await request(app)
                .get('/products')
                .set('access_token', test_adminAccessToken)
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBe(true)
                console.log(body[0].id, 'ini id hasil get')
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

// Edit Product
describe('Edit a product', () => {
    describe('Success', () => {
        it('Should return 200 and object (edited, message)', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: 'edited',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(200)
                expect(body).toHaveProperty('edited')
                expect(body).toHaveProperty('message', 'Product edited')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail', () => {
        it('Should return 403 and object (status, message), where role is not admin', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_userAccessToken)
                .send({
                    name: 'edited',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(403)
                expect(body).toHaveProperty('message', 'You are not authorized')
                done()
            } catch (err) {
                done(err)
            }
        })

        it('Should return 400 and object (status, message), where name is empty', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: '',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Product Name can not be empty')
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object (status, message), where image_url is empty', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: '',
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Product Image Url can not be empty')
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object (status, message), where price is negatives', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: -1,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Product Price can not be negatives')
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object (status, message), where stock is negatives', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: -1
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Product Stock can not be negatives')
                done()
            } catch (err) {
                done(err)
            }
        })

        it('Should return 404 and object (status, message), where product is not exist', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_falseProductId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: 'edited',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(404)
                expect(body).toHaveProperty('message', 'Product not found')
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

