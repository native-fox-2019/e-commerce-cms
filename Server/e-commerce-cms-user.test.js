const request = require('supertest');
const app = require('./app');
const {sequelize, Product, User} = require('./models')
const {queryInterface, } = sequelize

let id = null

afterAll(done => {
    User.destroy({where: {id}})
    .then(result => {
        done()
    })
    .catch(err => done(err))
});

describe('Register User', function(){
    describe('Successfully register', function(){
        it('Should return 201 and object (token, name, message)', (done) => {
            request(app)
            .post('/user/register')
            .send({
                name: 'Test',
                email: 'test@mail.com',
                password: 'test123',
                role: 'admin'
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'Test')
                expect(body).toHaveProperty('token')
                expect(body).toHaveProperty('message', 'Successfully registered and logged in')
                expect(body).toHaveProperty('id')
                id = body.id
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Unsuccessfully register due validation error', function(){
        it('Should return 400 and object (status, error)', (done) => {
            request(app)
            .post('/user/register')
            .send({
                name: '',
                email: '',
                password: 'test123',
                role: 'admin'
            })
            .then(response => {
                let {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('status', 400)
                expect(body).toHaveProperty('error')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})

describe('User Login', function(){
    describe('successfully logged in', function(){
        it('should return 200 and object(name, token, message', (done) => {
            request(app)
            .post('/user/login')
            .send({
                email: 'test@mail.com',
                password: 'test123'
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(200)
                expect(body).toHaveProperty('name')
                expect(body).toHaveProperty('token')
                expect(body).toHaveProperty('message', 'Successfully logged in')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('unsuccessfully log in due to wrong email', function(){
        it('should return 404 and object(status, msg)', (done) => {
            request(app)
            .post('/user/login')
            .send({
                email: 'te@mail.com',
                password: 'test123'
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(404)
                expect(body).toHaveProperty('status', 404)
                expect(body).toHaveProperty('msg', 'Wrong Email')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('unsuccessfully log in due to wrong password', function(){
        it('should return 400 and object(status, msg)', (done) => {
            request(app)
            .post('/user/login')
            .send({
                email: 'test@mail.com',
                password: 'test12'
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(400)
                expect(body).toHaveProperty('status', 400)
                expect(body).toHaveProperty('msg', 'Wrong Password')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})

