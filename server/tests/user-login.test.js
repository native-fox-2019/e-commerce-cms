const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

beforeAll(done => {
    queryInterface.bulkDelete('Users', {})
    .then(() => {
        return User.create({
            username: 'admin',
            email: 'admin@mail.com',
            password: 'admin',
            role: 'admin'
        })
    })
    .then(result => {
        console.log('User Created:', {
            username: result.username,
            password: result.password
        })
        done()
    })
    .catch(err => {
        done(err)
    })
})

// afterAll(done => {
//     queryInterface.bulkDelete('Users', {})
//     .then(() => done())
//     .catch(err => done(err))
// })

describe('User Login:', () => {
    describe('Login Success:', () => {
        it('should return 200:', async (done) => {
            await request(app)
            .post('/user/login')
            .send({
                username: 'admin',
                password: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(200)
                expect(body).toHaveProperty('token')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Login Fail:', () => {
        it('should return 400 (Invalid User / Pass):', async (done) => {
            await request(app)
            .post('/user/login')
            .send({
                username: 'h4XX0r',
                password: 'sudo_hack'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(400)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})