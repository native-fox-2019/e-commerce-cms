const request = require('supertest');
const app = require('./app');
const {sequelize, Product} = require('./models')
const {queryInterface} = sequelize

afterAll(done => {
    queryInterface
    .bulkDelete('Products', {})
    .then(() => done())
    .catch(err => done(err));
});

describe('Create a product item', function(){
    describe('Successfully create product', function(){
        it('Should return 201 and object (message, todo)', (done) => {
            // console.log('masuk')
            request(app)
            .post('/products')
            .send({
                name: 'Shoes',
                image_url: './image/shoes.jpg',
                price: 150000,
                stock: 10
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(201);
                expect(body).toHaveProperty('message', 'Successfully add the product');
                expect(body).toHaveProperty('product');
                expect(body.product).toHaveProperty('name', 'Shoes');
                expect(body.product).toHaveProperty('image_url', './image/shoes.jpg');
                expect(body.product).toHaveProperty('price', 150000);
                expect(body.product).toHaveProperty('stock', 10);
                done()
            })
            .catch(err => {
                
                done(err)
            })
        })
    })
    describe('Unsuccessfully create product due to validation error', function(){
        it('Should return 400 and object (status, error)', (done) => {
            // console.log('masuk')
            request(app)
            .post('/products')
            .send({
                name: '',
                image_url: './image/shoes.jpg',
                price: -2,
                stock: -1
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(400);
                expect(body).toHaveProperty('status', 400);
                expect(body).toHaveProperty('error');
                expect(body.error[0]).toHaveProperty('type');
                expect(body.error[0]).toHaveProperty('path');
                expect(body.error[0]).toHaveProperty('msg');
                // expect(body.product).toHaveProperty('image_url', './image/shoes.jpg');
                // expect(body.product).toHaveProperty('price', 150000);
                // expect(body.product).toHaveProperty('stock', 10);
                done()
            })
            .catch(err => {
                
                done(err)
            })
        })
    })
})