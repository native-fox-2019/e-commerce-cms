const app = require('../app')
const request = require('supertest')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')

let test_accessToken
const test_productName = 'test product'
const test_productImageUrl = 'www.google.com'
const test_productPrice = 1000000
const test_productStock = 1

beforeAll(async done  => {
    try {
        let user = await User.create({
            name: "bambang",
            email: "bambang@gmail.com",
            password: "bambang",
            role: "admin"
        })
        let token = generateToken({ id: user.id, email: user.email })
        test_accessToken = token
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

describe('Add new product', () => {
    describe('Success', () => {
        it('Should return 201 and object (newProduct, message)', async done => {
            try {
                const { body, status } = await request(app)
                    .post('/products')
                    .set('access_token', test_accessToken)
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
                .set('access_token', test_accessToken)
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
                .set('access_token', test_accessToken)
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
                .set('access_token', test_accessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: -1,
                    stock: test_productStock
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe("Product Price can not be negative")
                done()
            } catch (err) {
                done(err)
            }
        })
        it('Should return 400 and object(status, message), when stock is negatives', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products`)
                .set('access_token', test_accessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: -1
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message[0]).toBe("Product Stock can not be negative")
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

describe('Get all products', () => {
    describe('Success', () => {
        it('Should return 200 and array of objects', async done => {
            try {
                const { body, status } = await request(app)
                .get('/products')
                .set('access_token', test_accessToken)
                .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBe(true)
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

