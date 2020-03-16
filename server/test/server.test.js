const request = require('supertest')
const app = require('../app.js')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {
    queryInterface
    .bulkDelete('User', {})
    .then(() => done())
    .catch(err => done(err))
})

describe('Register new user', function() {
    describe('Successfully make a new user', function() {
        it('should return 201 and object(message, user)', async () => {

            await request(app)
            .post('/register')
            .send({
                username: 'AdamSmith',
                email: 'adamsmith@gmail.com',
                password: 'adamsmith',
            })
            .then(result => {
                const { body, status } = result

                expect(status).toBe(201)
                expect(body).toHaveProperty('message', 'Successfully registered new user')
                expect(body).toHaveProperty('user')
                expect(body.user.username).toBe('AdamSmith')
                expect(body.user.email).toBe('adamsmith@gmail.com')
            })
        })
    })
})