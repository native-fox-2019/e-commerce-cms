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
