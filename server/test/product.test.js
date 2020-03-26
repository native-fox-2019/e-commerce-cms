require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const Model = require('../models')
const User = Model.User
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')

let access_token_admin = null
let access_token_user = null
let invalid_access_token = null
let idProduct = null

beforeAll((done) => {
    let obj = {
        name : 'Admin-name',
        role : 'admin',
        email : 'test@admin.com',
        password : '1234',
    }
    User.create(obj)
    .then(data => {
        access_token_admin = jwt.sign({ id : data.id, email : data.email }, process.env.SECRET)
        let obj2 = {
            name : 'User-name',
            role : 'user',
            email : 'test@user.com',
            password : '1234'
        }
        return User.create(obj2)
    }) 
    .then(data => {
        access_token_user = jwt.sign({ id : data.id, email : data.email }, process.env.SECRET)
        done()
    }) 
    .catch(err => {
        done(err)
    })

  });

afterAll(done => {
    queryInterface
        .bulkDelete('Products', {})
        .then(() => done())
        .catch(err => done(err));
})

describe('Test for products', function() {
    describe('Success add products', function() {
        it('Should return 201', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: 50000,
                stock: 10
            })
            .then(res => {
                idProduct = res.body.data.id
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toHaveProperty('data')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Fail add products', function() {
        it('Should return 401, because invalid token', function(done) {
            request(app)
            .post('/products')
            .set('access_token', invalid_access_token)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: 50000,
                stock: 10
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body.message).toContain('Invalid Token')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 403, because role is user', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_user)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: 50000,
                stock: 10
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(403)
                expect(body.message).toContain('Forbidden')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because price is less then zero', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: -1,
                stock: 10
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                console.log(body.message + ' <<<<< body')
                expect(body.message).toContain('Validation min on price failed')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because stock is less then zero', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: 1000,
                stock: -1
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Validation min on stock failed')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because not have name', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: null,
                image_url: 'thisisurllink.com',
                price: 1000,
                stock: 5
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Name cannot be empty')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because not have image url', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: null,
                price: 1000,
                stock: 5
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Image url cannot be empty')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because not have price', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: null,
                stock: 5
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Price cannot be empty')
                done()
            })
            .catch(err => {
                done(err)
            })
        })

        it('Should return 400, because not have stock', function(done) {
            request(app)
            .post('/products')
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil',
                image_url: 'thisisurllink.com',
                price: 10000,
                stock: null
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Stock cannot be empty')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })

    describe('Success read products', function() {
        it('Should return 200', function(done) {
            request(app)
            .get('/products')
            .set('access_token', access_token_admin)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toHaveProperty('data')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Fail read products', function() {
        it('Should return 403 because not admin', function(done) {
            request(app)
            .get('/products')
            .set('access_token', access_token_user)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(403)
                expect(body.message).toBe('Forbidden')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Success read one products', function() {
        it('Should return 200', function(done) {
            request(app)
            .get(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toHaveProperty('data')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Fail read one products', function() {
        it('Should return 404 because id not found', function(done) {
            request(app)
            .get(`/products/9999`)
            .set('access_token', access_token_admin)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(404)
                expect(body.message).toContain('Not Found')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Fail read products because invalid token', function() {
        it('Should return 401', function(done) {
            request(app)
            .get('/products')
            .set('access_token', invalid_access_token)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(401)
                expect(body.message).toContain('Invalid Token')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Success edit products', function() {
        it('Should return 200', function(done) {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil-edited',
                image_url: 'thisisurllink-edited.com',
                price: 4000,
                stock: 19
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body.message).toBe('Update Success')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Failed edit products', function() {
        it('Should return 404 because id not found', function(done) {
            request(app)
            .put(`/products/9999`)
            .set('access_token', access_token_admin)
            .send({
                name: 'pencil-edited',
                image_url: 'thisisurllink-edited.com',
                price: 4000,
                stock: 19
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(404)
                expect(body.message).toBe('Not Found')
                done()
            })
            .catch(err => {
                done(err)
            })
        });

        it('Should return 403 because role is not admin', function(done) {
            request(app)
            .put(`/products/${idProduct}`)
            .set('access_token', access_token_user)
            .send({
                name: 'pencil-edited',
                image_url: 'thisisurllink-edited.com',
                price: 4000,
                stock: 19
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(403)
                expect(body.message).toBe('Forbidden')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Failed delete products', function() {
        it('Should return 404 because id not found', function(done) {
            request(app)
            .delete(`/products/9999`)
            .set('access_token', access_token_admin)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(404)
                expect(body.message).toBe('Not Found')
                done()
            })
            .catch(err => {
                done(err)
            })
        });

        it('Should return 403 because role is not admin', function(done) {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', access_token_user)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(403)
                expect(body.message).toBe('Forbidden')
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });

    describe('Success delete products', function() {
        it('Should return 200', function(done) {
            request(app)
            .delete(`/products/${idProduct}`)
            .set('access_token', access_token_admin)
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toBe(1)
                done()
            })
            .catch(err => {
                done(err)
            })
        });
    });


})