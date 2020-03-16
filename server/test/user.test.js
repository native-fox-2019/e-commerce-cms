const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const request = require('supertest')

// input your test env here
const test_name = 'bambang'
const test_email = 'bambang@gmail.com'
const test_password = 'bambang'

afterAll( done => {
    queryInterface.bulkDelete('Users')
        .then(() => done())
        .catch(err => done(err))
})

describe('Register', () => {
    describe('Sucesfully registered', () => {
        it('Should return 201 and object (access_token)', async done => {
            try {
                const { body, status } = await request(app).post('/register').send({
                    name: test_name,
                    email: test_email,
                    password: test_password
                })
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                done ()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail to register', () => {
        it('Should return 400 and object (status, message)', async done => {
            try {
                const { body, status } = await request(app).post('/register').send({
                    name: '',
                    email: '',
                    password: ''
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Name can not be empty')
                expect(body.message).toContain('Email can not be empty')
                expect(body.message).toContain('Password can not be empty')
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

describe('Login', () => {
    describe('Sucessfully login', () => {
        it('Should return 200 and object (access_token)', async done => {
            try {
                const { body, status } = await request(app).post('/login').send({
                    email: test_email,
                    password: test_password
                })
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                done()
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Fail to login', () => {
        it('Should return 400 and object (status, message)', async done => {
            try {
                const { body, status } = await request(app).post('/login').send({
                    email: '',
                    password: ''
                })
                expect(status).toBe(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toBe('Wrong email / password')
                done()
            } catch (err) {
                done(err)
            }
        })
    })
})

