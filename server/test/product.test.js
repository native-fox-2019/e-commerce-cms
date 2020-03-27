require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models');
const { queryInterface } = sequelize;
const { sign } = require('../helpers/jwt')
const { hashPass } = require('../helpers/bcrypt')
let access_token_user = null
let access_token_admin = null

beforeAll((done) => {
    // let obj = 
    // [
        // {
        //     name: 'admin',
        //     email: 'admin@admin.com',
        //     password: hashPass('123'),
        //     role: 'Admin'
        // }
        // ,
        // {
        //     name: '123',
        //     email: '123@123.com',
        //     password: hashPass('123'),
        //     role: 'User'
        // }
    // ]
    request(app)
    .post('/user/register')
    .send({
        name: 'ihiw',
        email: '123@123.com',
        password: '123',
        role: "Admin"
    })
    .then(data => {
        const { body, status } = data
        access_token_admin = body.access_token
        // expect(status).toBe(201)
        // expect(body).toHaveProperty('access_token')
        done()
    })
    .catch(err => {
        done(err)
    })
})

afterAll(done => {
    console.log(access_token_admin)
    console.log(access_token_user)
    queryInterface
        .bulkDelete('Users', {})
        .then(() => queryInterface
            .bulkDelete('Products', {}))
        .then(() => done())
        .catch(err => done(err));
})

describe('Admin Only', () => {
    describe('add products', () => {
        it('respond with details of products', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_admin)
                .send({
                    name: 'kembang',
                    price: 300000,
                    stocks: 3,
                    imageURL: 'http://google.com',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name')
                    expect(body).toHaveProperty('price')
                    expect(body).toHaveProperty('stocks')
                    expect(body).toHaveProperty('imageURL')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail adds products because empty form', () => {
        it('respond with array of message', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_admin)
                .send({
                    name: '',
                    price: 0,
                    stocks: 0,
                    imageURL: '',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    expect(body.msg[0]).toBe('name of products cant be empty')
                    expect(body.msg[1]).toBe('imageURL of products cant be empty')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail adds products because negative amount of price and stocks', () => {
        it('respond with array of message', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_admin)
                .send({
                    name: 'masa depan',
                    price: -1000,
                    stocks: -3,
                    imageURL: 'http://google.com/cari-sendiri-mau-gambar-apa',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    expect(body.msg[0]).toBe('Validation min on price failed')
                    expect(body.msg[1]).toBe('Validation min on stocks failed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail adds products because token role is user', () => {
        it('respond with array of message', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_user)
                .send({
                    name: 'masa depan',
                    price: 1000,
                    stocks: 3,
                    imageURL: 'http://google.com/cari-sendiri-mau-gambar-apa',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(401)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})

describe('Admin Only - Get One Product', () => {
    describe('success get one from params', () => {
        it('should return with datas of product', (done) => {
            request(app)
                .get('/admin/products/1')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(200)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail to get one because invalid token', () => {
        it('should return with message', (done) => {
            request(app)
                .get('/admin/products/1')
                .set('access_token', access_token_user)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(401)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail to get one because data not found', () => {
        it('should return with message', (done) => {
            request(app)
                .get('/admin/products/1')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(401)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})

describe("update product's data", () => {
    describe("success on updating data", () => {
        it('should returning data adter updated', (done) => {
            request(app)
                .put('/admin/products/1')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('name')
                    // expect(body).toHaveProperty('price')
                    // expect(body).toHaveProperty('stocks')
                    // expect(body).toHaveProperty('imageURL')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe("failed on updating data because empty form", () => {
        it('should returning array of message', (done) => {
            request(app)
                .put('/admin/products/1')
                .set('access_token', access_token_admin)
                .send({
                    name: '',
                    price: 1000,
                    stocks: 3,
                    imageURL: '',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    expect(body.msg[0]).toBe('name of products cant be empty')
                    expect(body.msg[1]).toBe('imageURL of products cant be empty')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe("failed on updating data because price and stocks less than 0", () => {
        it('should returning array of message', (done) => {
            request(app)
                .put('/admin/products/1')
                .set('access_token', access_token_admin)
                .send({
                    name: '123',
                    price: -1000,
                    stocks: -3,
                    imageURL: 'qwe',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    expect(body.msg[0]).toBe('Validation min on price failed')
                    expect(body.msg[1]).toBe('Validation min on stocks failed')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe("failed on updating data because invalid token", () => {
        it('should returning array of message', (done) => {
            request(app)
                .put('/admin/products/1')
                .set('access_token', access_token_user)
                .send({
                    name: '123',
                    price: 1000,
                    stocks: 3,
                    imageURL: 'qwe',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(401)
                    expect(body.msg).toBe('Invalid Token')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})

describe("Delete data", () => {
    describe("success delete product's data", () => {
        it('should returning data that has been deleted', (done) => {
            request(app)
                .delete('/admin/products/1')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(200)
                    // expect(body).toHaveProperty('name')
                    // expect(body).toHaveProperty('price')
                    // expect(body).toHaveProperty('stocks')
                    // expect(body).toHaveProperty('imageURL')
                    done()
                })
        })
    })
    describe("failed delete product's databecause data not found", () => {
        it("should returning array of message", () => {
            request(app)
                .delete('/admin/products/1')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(404)
                    expect(body.msg).toBe('Not Found')
                })
        })
    })
    describe("failed delete product's databecause data not found", () => {
        it("should returning array of message", () => {
            request(app)
                .delete('/admin/products/160')
                .set('access_token', access_token_admin)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(404)
                    expect(body.msg).toBe('Not Found')
                })
        })
    })
    describe("failed delete product's data because Invalid Token", () => {
        it("should returning array of message", () => {
            request(app)
                .delete('/admin/products/1')
                .set('access_token', access_token_user)
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(401)
                    expect(body.msg).toBe('Invalid Token')
                })
        })
    })
})