const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const userController = require('../controllers/user')
const jwt = require('jsonwebtoken')

let access_token_admin = ''
let access_token_wrong = ''

beforeAll(done => {
    request(app)
    .post('/user/login')
    .send({
        username: 'admin',
        password: 'admin'
    })
    .then(response => {
        const { status, body } = response
        access_token_admin = body.access_token
        request(app)
        .post('/user/login')
        .send({
            username: 'user',
            password: 'user'
        })
        .then(response => {
            const { status, body } = response
            access_token_wrong = body.access_token
            done()
        })
    })
    .then(() => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('Register New User:', () => {
    describe('Register Success:', () => {
        it('should return 201:', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin2',
                email: 'admin2@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .set('access_token', access_token_admin)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(201)
                expect(body.username).toBe('admin2')
                expect(body.email).toBe('admin2@mail.com')
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
        it('should return 401 (Unauthenticated):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'admin3',
                email: 'admin3@mail.com',
                password: 'admin',
                role: 'admin'
            })
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(401)
                expect(body.message).toBe('You must log in first!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 403 (Unauthorized):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'anonymous',
                email: 'h4xx0r@mail.com',
                password: 'noobmaster69',
                role: 'admin'
            })
            .set('access_token', access_token_wrong)
            .then(response => {
                const { status, body } = response
                console.log({ status, message: body.message })
                expect(status).toBe(403)
                expect(body.message).toBe('You don\'t have access to this!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Duplicate Account):', (done) => {
            request(app)
            .post('/user/register')
            .send({
                username: 'user',
                email: 'user@mail.com',
                password: 'user',
                role: 'user'
            })
            .set('access_token', access_token_admin)
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
                email: 'user@mail.com',
                password: 'user',
                role: 'user'
            })
            .set('access_token', access_token_admin)
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
                username: 'user',
                email: 'user@mail.com',
                password: '',
                role: 'user'
            })
            .set('access_token', access_token_admin)
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
                username: 'user',
                email: 'user@mail.com',
                password: 'user',
                role: 'CEO'
            })
            .set('access_token', access_token_admin)
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