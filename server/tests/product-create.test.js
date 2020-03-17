const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')

let access_token = ''

beforeAll(done => {
    queryInterface.bulkDelete('Users', {})
    .then(() => {
        return queryInterface.bulkDelete('Products', {})
    })
    .then(() => {
        return User.create({
            username: 'admin',
            email: 'admin@mail.com',
            password: 'admin',
            role: 'admin'
        })
    })
    .then(result => {
        console.log('User Created w/ ID:', { id: result.id })
        access_token = jwt.sign({ id: result.id }, process.env.JWT_SECRET)
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

describe('Create Product:', () => {
    describe('Create Success:', () => {
        it('should return 201:', (done) => {
            request(app)
            .post('/product')
            .send({
                name: 'Corsair Vengeance RAM 8GB DDR4',
                image_url: 'https://www.scan.co.uk/images/products/2908083-a.jpg',
                price: 600000,
                stock: 12
            })
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(201)
                expect(body.name).toBe('Corsair Vengeance RAM 8GB DDR4')
                expect(body.image_url).toBe('https://www.scan.co.uk/images/products/2908083-a.jpg')
                expect(body.price).toBe(600000)
                expect(body.stock).toBe(12)
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Create Fail:', () => {
        it('should return 400 (Null Field):', (done) => {
            request(app)
            .post('/product')
            .send({
                name: null,
                image_url: 'https://www.scan.co.uk/images/products/2908083-a.jpg',
                price: 600000,
                stock: 12
            })
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Product name cannot be NULL!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Empty Field):', (done) => {
            request(app)
            .post('/product')
            .send({
                name: 'Corsair Vengeance RAM 8GB DDR4',
                image_url: '',
                price: 600000,
                stock: 12
            })
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Product image URL cannot be empty!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Invalid Price / Stock Datatype):', (done) => {
            request(app)
            .post('/product')
            .send({
                name: 'Corsair Vengeance RAM 8GB DDR4',
                image_url: 'https://www.scan.co.uk/images/products/2908083-a.jpg',
                price: 'enamratusribu',
                stock: 12
            })
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Product price must be integer!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
        it('should return 400 (Invalid Price / Stock Quantity):', (done) => {
            request(app)
            .post('/product')
            .send({
                name: 'Corsair Vengeance RAM 8GB DDR4',
                image_url: 'https://www.scan.co.uk/images/products/2908083-a.jpg',
                price: 600000,
                stock: -12
            })
            .set('access_token', access_token)
            .then(response => {
                const { status, body } = response
                console.log({ status, body })
                expect(status).toBe(400)
                expect(body.message[0]).toBe('Product stock cannot be negative value!')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})