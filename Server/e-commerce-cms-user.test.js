const request = require('supertest');
const app = require('./app');
const {sequelize, Product} = require('./models')
const {queryInterface} = sequelize

afterAll(done => {
    queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err));
});

describe('Register User', function(){
    describe('Successfully register', function(){
        it('Should return 201 and object (token, name)', (done) => {
            request(app)
            .post('/user/register')
            .send({
                name: 'Test',
                email: 'test@mail.com',
                password: 'test123',
                role: 'admin'
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(201)
                expect(body).toHaveProperty('name', 'Test')
                expect(body).toHaveProperty('token')
                expect(body).toHaveProperty('message', 'Successfully registered and logged in')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Unsuccessfully register due validation error', function(){
        it('Should return 400 and object (status, error)', (done) => {
            request(app)
            .post('/user/register')
            .send({
                name: '',
                email: '',
                password: 'test123',
                role: 'admin'
            })
            .then(response => {
                let {status, body} = response
                expect(status).toBe(400)
                expect(body).toHaveProperty('status', 400)
                expect(body).toHaveProperty('error')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})

