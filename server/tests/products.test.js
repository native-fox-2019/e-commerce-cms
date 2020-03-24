const app = require('../app')
const request = require('supertest')
const { sequelize, users } = require('../models')
const { queryInterface } = sequelize
const { jwtSign } = require('../helpers/jwt')

let test_adminAccessToken
// let test_userAccessToken
const test_productName = 'test product'
const test_productImageUrl = 'www.google.com'
const test_productPrice = 1000000
const test_productStock = 1
// let test_productId

beforeAll(async done  => {
    try {
        let admin = await users.create({
            email: "steven@mail.com",
            password: "steven",
            role: "Admin"
        })
        // let user = await users.create({
        //     email: "stevenjuga@mail.com",
        //     password: "stevenjuga",
        //     role: "User"
        // })
        let adminToken = jwtSign({ id: admin.id, email: admin.email})
        // let userToken = jwtSign({ id: user.id, email: user.email})
        test_adminAccessToken = adminToken
        // test_userAccessToken = userToken
        done()
    } catch (err) {
        done(err)
    }
    
})

afterAll(done => {
    queryInterface.bulkDelete('products')
        .then(() => done())
        .catch(err => done(err))
})

// Add Product
describe('Add new product', () => {
    describe('Success', () => {
        it('Should return 201 and object (newProduct, message)', async done => {
            try {
                const { body, status } = await request(app)
                    .post('/product')
                    .set('token', test_adminAccessToken)
                    .send({
                    name: test_productName,
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(201)
                test_productId = body.id
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail', () => {
        it('Should return 500 and object(status, message)', async done => {
            try {
                const { body, status } = await request(app).post('/product').send({
                    name: 12345,
                    image: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(500)
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
                .get('/product')
                .set('token', test_adminAccessToken)
                expect(status).toBe(200)
                expect(Array.isArray(body)).toBe(true)
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
                .put(`/product/${test_productId}`)
                .set('token', test_adminAccessToken)
                .send({
                    name: 'edited',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(200)
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail', () => {
        it('Should return 404 and object (status, message), where name is empty', async done => {
            try {
                const { body, status } = await request(app)
                .put(`/products/${test_productId}`)
                .set('access_token', test_adminAccessToken)
                .send({
                    name: 'test',
                    image_url: test_productImageUrl,
                    price: test_productPrice,
                    stock: test_productStock
                })
                expect(status).toBe(404)
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

describe('Delete a product', () => {
    describe('Success', () => {
        it('Should return 200 and object (deleted, message)', async done => {
            try {
                const { body, status } = await request(app)
                .delete(`/product/${test_productId}`)
                .set('token', test_adminAccessToken)
                expect(status).toBe(200)
                console.log(body,"isi body")

                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail', () => {

        it ('Should return 404 and object (status, message)', async done => {
            try {
                const { body, status } = await request(app)
                .delete(`/products/${test_productId+7272}`)
                .set('access_token', test_adminAccessToken)
                expect(status).toBe(404)
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})