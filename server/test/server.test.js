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

describe('Register new user', function() {
    describe('Successfully make a new user and then log it in', function() {
        it('should return 201 and object(message, user)', async () => {

            await request(app)
            .post('/user/register')
            .send({
                username: 'AdamSmith',
                email: 'adamsmith@gmail.com',
                password: 'adamsmith',
            })
            .then(result => {
                const { body, status } = result

                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Successfully registered new user')
                expect(body).toHaveProperty('data')
                expect(body.data.username).toBe('AdamSmith')
                expect(body.data.email).toBe('adamsmith@gmail.com')
            })
            .catch(err => {
                console.log(err)
            })
        })

        it('should return 200 and object(message, user)', async () => {

            await request(app)
            .post('/user/login')
            .send({
                email: 'adamsmith@gmail.com',
                password: 'adamsmith',
            })
            .then(result => {
                const { body, status } = result

                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Login successful')
                console.log('TOKEN')
                console.log(body.token)
                expect(body).toHaveProperty('token')
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
})