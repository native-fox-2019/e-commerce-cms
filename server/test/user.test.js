const request = require('supertest')
const app = require('../app.js')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {
    queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err))
})

describe('Register/Login User', function() {
    describe('Test signing in a new account and logging in', function() {
        it(`Register (success): return 201 and object(user and message)`, async () => {
            try {
                const result = await request(app)
                    .post('/user/register')
                    .send({
                        username: 'AdamSmith',
                        email: 'adamsmith@gmail.com',
                        password: 'adamsmith',
                    })
                    const { status, body } = result
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('message', 'Successfully registered new user')
                    expect(body).toHaveProperty('data')
                    expect(body.data.username).toBe('AdamSmith')
                    expect(body.data.email).toBe('adamsmith@gmail.com')
                    expect(body.data.password).not.toBe('adamsmith')
            } catch (err) {
                console.log(err)
            }
        })

        it(`Login (success): should return 200 and object (token)`, async () => {
            try {
                const result = await request(app)
                .post('/user/login')
                .send({
                    email: 'adamsmith@gmail.com',
                    password: 'adamsmith'
                })
                const { status, body } = result
                expect(status).toBe(200)
                expect(body).toHaveProperty('token')
            } catch (err) {
                console.log(err)
            }
        }) 
    })

    describe('Error test of register and login', function() {
        it(`Register(error): return 400 and object(message)`, async () => {
            try {
                const result = await request(app)
                    .post('/user/register')
                    .send({
                        username: '',
                        email: 'adamsmith',
                        password: '',
                    })
                    const { status, body } = result
                    console.log(result)
                    expect(status).toBe(400)
                    expect(body).toHaveProperty(message)
            } catch (err) {
                console.log(err)
            }
        })
    })
})