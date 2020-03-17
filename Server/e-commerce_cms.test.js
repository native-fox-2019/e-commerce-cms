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

let id = null;

describe('Create a product item', function(){
    describe('Successfully create product', function(){
        it('Should return 201 and object (message, product)', (done) => {
            // console.log('masuk')
            request(app)
            .post('/products')
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .send({
                name: 'Shoes',
                image_url: './image/shoes.jpg',
                price: 150000,
                stock: 10
            })
            .then(response => {
                let {body, status} = response
                id = body.product.id
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
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
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
                done()
            })
            .catch(err => {           
                done(err)
            })
        })
    })
    describe('Unsuccessfully create product due to authorization', function(){
        it('Should return 403 and object (status, msg)', (done) => {
            // console.log('masuk')
            request(app)
            .post('/products')
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlRlc3RpbmciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTg0NDE2MTg3fQ.Tz_9sszRZbrS60YWZymIxvWz1tSVuAyhF6u5CZu27TE'})
            .send({
                name: '',
                image_url: './image/shoes.jpg',
                price: -2,
                stock: -1
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(403);
                expect(body).toHaveProperty('status', 403);
                expect(body).toHaveProperty('msg', 'Not Authorized');
                done()
            })
            .catch(err => {           
                done(err)
            })
        })
    })
})

describe('get list of products', function(){
    describe('successfully get products', function(){
        it('Should return 200 and object(products)', (done) => {
            request(app)
            .get('/products')
            .then(response => {
                let {body, status} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('products')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})

describe('get a product by id', function(){
    describe('sucessfully get product', function(){
        it('Should return 200 and object(product)', (done) => {
            request(app)
            .get(`/products/${id}`)
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(200)
                expect(body).toHaveProperty('product')
                expect(body.product).toHaveProperty('name');
                expect(body.product).toHaveProperty('image_url');
                expect(body.product).toHaveProperty('price');
                expect(body.product).toHaveProperty('stock');
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('unsucessfully get product', function(){
        it('Should return 404 and object(status, msg)', (done) => {
            request(app)
            .get(`/products/1`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(404)
                expect(body).toHaveProperty('status', 404)
                expect(body).toHaveProperty('msg', 'Product not found')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
})

describe('Edit a product item', function(){
    describe('Successfully edit product', function(){
        it('Should return 200 and object (message, product)', (done) => {
            // console.log('masuk')
            request(app)
            .put(`/products/${id}`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .send({
                name: 'Shoes',
                image_url: './image/shoes.jpg',
                price: 200000,
                stock: 6
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(200);
                expect(body).toHaveProperty('message', 'Successfully edit the product');
                expect(body).toHaveProperty('product');
                expect(body.product).toHaveProperty('name', 'Shoes');
                expect(body.product).toHaveProperty('image_url', './image/shoes.jpg');
                expect(body.product).toHaveProperty('price', 200000);
                expect(body.product).toHaveProperty('stock', 6);
                done()
            })
            .catch(err => {      
                done(err)
            })
        })
    })
    describe('Unsuccessfully edit product due to validation error', function(){
        it('Should return 400 and object (status, error)', (done) => {
            // console.log('masuk')
            request(app)
            .put(`/products/${id}`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
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
                done()
            })
            .catch(err => {           
                done(err)
            })
        })
    })
    describe('Unsucsessfully edit product due to product not found', function(){
        it('Should return 404 and object (status, msg)', (done) => {
            request(app)
            .put('/products/1')
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .send({
                name: '',
                image_url: './image/shoes.jpg',
                price: -2,
                stock: -1
            })
            .then(response => {
                let {status, body} = response;
                expect(status).toBe(404)
                expect(body).toHaveProperty('status', 404)
                expect(body).toHaveProperty('msg', 'Product not found')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Unsuccessfully edit product due to authorization', function(){
        it('Should return 403 and object (status, msg)', (done) => {
            // console.log('masuk')
            request(app)
            .put(`/products/${id}`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlRlc3RpbmciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTg0NDE2MTg3fQ.Tz_9sszRZbrS60YWZymIxvWz1tSVuAyhF6u5CZu27TE'})
            .send({
                name: '',
                image_url: './image/shoes.jpg',
                price: -2,
                stock: -1
            })
            .then(response => {
                let {body, status} = response
                expect(status).toBe(403);
                expect(body).toHaveProperty('status', 403);
                expect(body).toHaveProperty('msg', 'Not Authorized');
                done()
            })
            .catch(err => {           
                done(err)
            })
        })
    })
})

describe('Delete Product', function(){
    describe('Successfully delete product', function(){
        it('Should return 200 and object (message)', (done) => {
            request(app)
            .delete(`/products/${id}`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .then(response => {
                let {status, body} = response
                expect(status).toBe(200)
                expect(body).toHaveProperty('message', 'Successfully delete product')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Unsuccessfully delete product due to not found', function(){
        it('Should return 404 and object (status, msg', (done) => {
            request(app)
            .delete(`/products/1`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkFkaGl5YXRtYSBQcmFtYXlvZ2EiLCJlbWFpbCI6ImFkaGl5YXRtYS5wcmFtYXlvZ2FAZ21haWwuY29tIiwiaWF0IjoxNTg0MzU5MjMyfQ.9BuTB8wfOqCBKvsXbUiMKjJCvKKKY0aeMWWX90-pBiI'})
            .then(response => {
                let {status, body} = response
                expect(status).toBe(404)
                expect(body).toHaveProperty('status', 404)
                expect(body).toHaveProperty('msg', 'Product not found')
                done()
            })
            .catch(err => {
                done(err)
            })
        })
    })
    describe('Unsuccessfully edit product due to authorization', function(){
        it('Should return 403 and object (status, msg)', (done) => {
            // console.log('masuk')
            request(app)
            .delete(`/products/${id}`)
            .set({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6IlRlc3RpbmciLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNTg0NDE2MTg3fQ.Tz_9sszRZbrS60YWZymIxvWz1tSVuAyhF6u5CZu27TE'})
            .then(response => {
                let {body, status} = response
                expect(status).toBe(403);
                expect(body).toHaveProperty('status', 403);
                expect(body).toHaveProperty('msg', 'Not Authorized');
                done()
            })
            .catch(err => {           
                done(err)
            })
        })
    })
})