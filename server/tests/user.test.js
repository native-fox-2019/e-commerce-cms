const app = require('../app')
const request = require('supertest')
const {
    sequelize
} = require('../models')
const {
    queryInterface
} = sequelize

// Setelah selesai semua
afterAll((done) => {
    queryInterface.bulkDelete('Users', {})
        .then(() => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

// Test Register
describe('Test Register', () => {
    it('Try to Regist Successfully:', (done) => {
        request(app).post('/user/registration').send({
                name: 'User 1',
                email: 'user1@mail.com',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(201)
                expect(body).toHaveProperty('access_token')
                expect(body).toHaveProperty('message', 'Create new User Successfully')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to Register With Empty Email', (done) => {
        request(app).post('/user/registration').send({
                name: 'User 1',
                email: '',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('status_code', 400)
                expect(body).toHaveProperty('message', ['Email Column Cannot Empty'])
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to Register With Empty Email and Password length < 6', (done) => {
        request(app).post('/user/registration').send({
                name: 'User 2',
                email: '',
                password: 'qwer'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('status_code', 400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Email Column Cannot Empty')
                expect(body.message).toContain('Password Length Minimum 6 Characters')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to Register with Registered Email', (done) => {
        request(app).post('/user/registration').send({
                name: 'User 2',
                email: 'user1@mail.com',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('status_code', 400)
                expect(body).toHaveProperty('message', 'Email Already Registered')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

})

// Test Login
describe('Test Login', () => {
    it('Try to Login Successfully', (done) => {
        request(app).post('/user/login').send({
                email: 'user1@mail.com',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                expect(body).toHaveProperty('message', 'Login Successfully')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to Login Unregistered User', (done) => {
        request(app).post('/user/login').send({
                email: 'user123@mail.com',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(404)
                expect(body).toHaveProperty('status_code', 404)
                expect(body).toHaveProperty('message', 'You Are not Registered')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to Login With Wrong Password', (done) => {
        request(app).post('/user/login').send({
                email: 'user1@mail.com',
                password: 'qwerty123'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(400)
                expect(body).toHaveProperty('status_code', 400)
                expect(body).toHaveProperty('message', 'Wrong Password')
                done()
            })
            .catch(err => {
                done(err)
            })
    })

})

// ###########################################################################################################################################################