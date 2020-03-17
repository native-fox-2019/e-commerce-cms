const request = require ('supertest');
const app = require('./app.js');
const { sequelize , Product } = require ('./models')
const {queryInterface} = sequelize;

describe('Register a new user', function(){
    describe('Successfully register a new user', function() {
        test('Should return 201 and object (token)', (done) =>{
            request(app)
            .post('/users/register')
            .send({
                email: 'babam@gmail.com',
                password:`babam123`,
            })
            .then(result =>{
                expect(result.status).toEqual(201)
                // expect(result).toHaveProperty('token')
                // expect(result.token).toBe('any random token')
                done()
            })
            .catch(err =>{
                done(err)
            })
        })
    })
    
    describe('Failed to register new user', function(){
        test('Should return 500 and object (message)',(done) =>{
            request(app)
            .post('/users/register')
            .send({
                email: 'babam',
                password: `123`,
            })
            .then(result =>{
                expect(result.status).toEqual(500)
                expect(result.body.message).toEqual("Password must be at least 6 characters")
                done()
            })
            .catch(err =>{
                done(err)
            })
        })
    })
})

describe('Login to app', function(){
    describe('Successfully login', function() {
        test('Should login and return 200 and object (token)', (done) =>{
            request(app)
            .post('/users/login')
            .send({
                email: 'babam@gmail.com',
                password:`babam123`,
            })
            .then(result =>{
                expect(result.status).toEqual(200)
                // expect(result).toHaveProperty('token')
                // expect(result.token).toBe('any random token')
                done()
            })
            .catch(err =>{
                done(err)
            })
        })
    })
    describe('Failed to login', function() {
        test('Should login and return 200 and object (token)', (done) =>{
            request(app)
            .post('/users/login')
            .send({
                email: 'babam@gmail.com',
                password:`babam123`,
            })
            .then(result =>{
                expect(result.status).toEqual(200)
                // expect(result).toHaveProperty('token')
                // expect(result.body.token).toBe('any random token')
                done()
            })
            .catch(err =>{
                done(err)
            })
        })
    })
})

describe('Create a product item', function(){
    describe('Successfully create product', function() {
        test('Should return 201 and object (message, product)', (done) =>{
            request(app)
            .post('/products')
            .send({
                name: 'jam tangan',
                image_url:`https://jamtangan123`,
                price:1000000,
                stock:30
            })
            .then(result =>{
                const { body, status } = result
                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Successfully create product')
                expect(body).toHaveProperty('product')
                expect(body.product.name).toBe('jam tangan')
                expect(body.product.image_url).toBe('https://jamtangan123')
                expect(body.product.price).toBe(1000000)
                expect(body.product.stock).toBe(30)
                done()
            })
        })
    })
})
