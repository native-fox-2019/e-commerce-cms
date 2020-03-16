const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

// REGISTER
describe('Register New User:', () => {
    describe('Register Success:', () => {
        it('should return 201:', async (done) => {
            await request(app)
            .post('/user/register')
            .send({
                username: 'admin',
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body.username).toBe('admin')
                expect(body.email).toBe('admin@mail.com')
                expect(body.password).toBe('admin')
                expect(body.role).toBe('admin')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    }),
    describe('Register Fail:', () => {
        it('should return 400 (Duplicate):', async (done) => {
            await request(app)
            .post('/user/register')
            .send({
                username: 'admin',
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(201)
                expect(body.username).toBe('admin')
                expect(body.email).toBe('admin@mail.com')
                expect(body.password).toBe('admin')
                expect(body.role).toBe('admin')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})