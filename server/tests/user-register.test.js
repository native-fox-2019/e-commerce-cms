const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

beforeAll(done => {
    queryInterface.bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err))
})

describe('Register New User:', () => {
    describe('Register Success:', () => {
        it('should return 201:', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin',
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(201)
                expect(body.username).toBe('admin')
                expect(body.email).toBe('admin@mail.com')
                expect(body.password).not.toBe('admin')
                expect(body.role).toBe('admin')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Register Fail:', () => {
        it('should return 400 (Duplicate Account):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin',
                email: 'admin@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(400)
                expect(body.message).toBe('Already exists!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Null Field):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: null,
                email: 'admin2@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Username cannot be NULL!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Empty Field):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin2',
                email: 'admin2@mail.com',
                password: '',
                role: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Password cannot be empty!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Invalid Role):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin2',
                email: 'admin2@mail.com',
                password: 'admin',
                role: 'CEO'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Role must be either admin or user!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})