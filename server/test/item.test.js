const request = require('supertest')
const app = require('../app.js')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

afterAll(done => {
    queryInterface
    .bulkDelete('Items', {})
    .then(() => done())
    .catch(err => done(err))
})

describe('CRUD for Item model', function() {
    describe('Test adding a new item into the database'), function() {
        it(`Create (success): return 201 and object(data)`, (done) => {
            request(app)
                .post('/items')
                .send({
                    name: 'Goose',
                    image_url: `https://www.playstationlifestyle.net/assets/uploads/2020/02/goose.jpeg`,
                    price: 10000,
                    stock: 2,
                    headers: {
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsInVzZXJuYW1lIjoiQWRhbVNtaXRoIiwiZW1haWwiOiJhZGFtc21pdGhAZ21haWwuY29tIiwiaWF0IjoxNTg0MzYzNTIwfQ.Ns9IlrAzTQpQgAWFePNHNJBi3w8_e8RJ4xTE0Il4gaY'
                    }
                })
                .then(result => {
                    const { status, body } = result
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('data')
                    expect(body.data.name).toBe('Goose')
                    expect(body.data.name).toBe(10000)
                    expect(body.data.stock).toBe(2)
                    done()
                })
                .catch(err => {
                    console.log(err)

                })
        })
    }



})