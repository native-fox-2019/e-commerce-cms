const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(done => {
    queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch(err => done(err));
})

describe('user register', () => {
    describe('success register', () => {
        it('response with status 201 with access_token included', (done) => {
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
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('failed register - empty form', () => {
        it('responds with array of message', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    name: '',
                    email: '',
                    password: ''
                })
                .then(data => {
                    const { body, status } = data
                    console.log('masuk sii')
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg')
                    expect(Array.isArray(body.msg)).toBe(true)
                    expect(body.msg[0]).toBe('name cant be empty')
                    expect(body.msg[1]).toBe('email cant be empty')
                    expect(body.msg[2]).toBe('password cant be empty')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('failed register - already used email', () => {
        it('responds with message', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    name: 'ihiw',
                    email: '123@123.com',
                    password: '123'
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('msg')
                    expect(body.msg).toBe('email already used')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})

describe('user login', () => {
    describe('success login', () => {
        it('respond with token', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    email: '123@123.com',
                    password: '123'
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(200)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('failed login - empty form email and password ', () => {
        it('respond with message', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    email: '',
                    password: ''
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('msg', 'incorrect USERNAME/PASSWORD')
                    done()
                })
                .catch(err =>{
                    done(err)
                })
        })
    })
    describe('failed login - incorrect email or password ', () => {
        it('respond with message', (done) => {
            request(app)
                .post('/user/login')
                .send({
                    email: '13@13.com',
                    password: '12'
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(404)
                    expect(body).toHaveProperty('msg', 'incorrect USERNAME/PASSWORD')
                    done()
                })
                .catch(err =>{
                    done(err)
                })
        })
    })
})


// describe('user login', () => {

// })
// describe('product add', () => {

// })