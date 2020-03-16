const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { comparePass } = require('../helpers/bcrypt')

beforeAll(done => {
    queryInterface.bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err))
})

// afterAll(done => {
//     queryInterface.bulkDelete('Users', {})
//     .then(() => done())
//     .catch(err => done(err))
// })

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
                console.log({ status, body })
                expect(status).toBe(201)
                expect(body.username).toBe('admin')
                expect(body.email).toBe('admin@mail.com')
                expect(comparePass('admin', body.password)).toBe(true)
                expect(body.role).toBe('admin')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    }),
    describe('Register Fail:', () => {
        it('should return 400 (Duplicate Account):', async (done) => {
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
                expect(status).toBe(400)
                expect(body.status).toBe(400)
                expect(body.message).toBe('Username / Email already registered!')
                console.log(body)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Null Field):', async (done) => {
            await request(app)
            .post('/user/register')
            .send({
                username: null,
                email: 'admin2@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body.status).toBe(400)
                expect(body.message[0]).toBe('Username cannot be NULL!')
                console.log(body)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Empty Field):', async (done) => {
            await request(app)
            .post('/user/register')
            .send({
                username: 'admin2',
                email: 'admin2@mail.com',
                password: '',
                role: 'admin'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body.status).toBe(400)
                expect(body.message[0]).toBe('Password cannot be empty!')
                console.log(body)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Invalid Role):', async (done) => {
            await request(app)
            .post('/user/register')
            .send({
                username: 'admin2',
                email: 'admin2@mail.com',
                password: 'admin',
                role: 'CEO'
            })
            .then(response => {
                const { body, status } = response
                expect(status).toBe(400)
                expect(body.status).toBe(400)
                expect(body.message[0]).toBe('Role must be either admin or user!')
                console.log(body)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})