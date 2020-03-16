const request = require('supertest');
const app = require('../app.js');
const {Product, User, sequelize} = require('../models');
const {queryInterface} = sequelize;
const jwt = require('jsonwebtoken');
require('dotenv').config();

let access_token;
let access_token_not_admin;
let idProduct;

beforeAll((done)=>{
    User.create({
        email: 'testAdmin@mail.com',
        password: '123',
        role: 'admin',
        username: 'admin'
    })
        .then(data=>{
            let token = jwt.sign({
                id: data.id,
                email: data.email,
                username: data.username
            }, process.env.SECRET)

            access_token = token;
            
            return  User.create({
                email: 'testAdmin2@mail.com',
                password: '123',
                role: 'user',
                username: 'admin'
            })
        })
        .then(data=>{
            let token = jwt.sign({
                id: data.id,
                email: data.email,
                username: data.username
            }, process.env.SECRET)

            access_token_not_admin = token;
            done()
        })
        .catch(err=>{
            done(err)
        })
})


afterAll(done=>{
    queryInterface
    .bulkDelete('Products', {})
    .then(()=> done())
    .catch(err=> done(err));
})


describe('Product routes', function(){
    describe('POST /products', function(){
        it('add product', function(done){
            request(app)
                .post('/products')
                .set('token', access_token)
                .send({
                    name: 'test product',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    idProduct = data.body.id
                    expect(data.status).toEqual(201);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: Name is empty', function(done){
            request(app)
                .post('/products')
                .set('token', access_token)
                .send({
                    name: null,
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Name is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('Should give an error Image url is empty', function(done){
            request(app)
                .post('/products')
                .set('token', access_token)
                .send({
                    name: 'test product',
                    image_url: null,
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Image url is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });

        it('Should give an error: Price is empty', function(done){
            request(app)
                .post('/products')
                .set('token', access_token)
                .send({
                    name: 'test product',
                    image_url: 'test url',
                    price: null,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Price is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });

        it('Should give an error: Stock is empty', function(done){
            request(app)
                .post('/products')
                .set('token', access_token)
                .send({
                    name: 'test product',
                    image_url: 'test url',
                    price: 1000,
                    stock: null
                })
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Stock is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: jwt must be provided', function(done){
            request(app)
                .post('/products')
                .set('token', '')
                .send({
                    name: 'test product',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(401);
                    expect(data.body.message).toEqual('jwt must be provided')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });

        it('Should give an error: not authorized', function(done){
            request(app)
                .post('/products')
                .set('token', access_token_not_admin)
                .send({
                    name: 'test product',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(403);
                    expect(data.body.message).toEqual('not authorized')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
    })

    describe('GET /products', function(){
        it('should show product', function(done){
            request(app)
                .get('/products')
                .set('token', access_token)
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: jwt must be provided', function(done){
            request(app)
                .get('/products')
                .set('token', '')
                .then(data => {
                    expect(data.status).toEqual(401);
                    expect(data.body.message).toEqual('jwt must be provided')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
    })

    describe('GET /products/:id', function(){
        it('should show product by id', function(done){
            request(app)
                .get(`/products/${idProduct}`)
                .set('token', access_token)
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        it('should give an error: User not found', function(done){
            request(app)
                .get(`/products/0`)
                .set('token', access_token)
                .then(data => {
                    expect(data.status).toEqual(404);
                    expect(data.body.message).toEqual('User not found');
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        it('should give an error: jwt must be provided', function(done){
            request(app)
                .get(`/products/${idProduct}`)
                .set('token', '')
                .then(data => {
                    expect(data.status).toEqual(401);
                    expect(data.body.message).toEqual('jwt must be provided')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        it('should give an error: not authorized', function(done){
            request(app)
                .get(`/products/${idProduct}`)
                .set('token', access_token_not_admin)
                .then(data => {
                    expect(data.status).toEqual(403);
                    expect(data.body.message).toEqual('not authorized')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })

    describe('PUT /products/:id', function(){
        it('should edit a product', function(done){
            request(app)
                .put(`/products/${idProduct}`)
                .set('token', access_token)
                .send({
                    name: 'test product edited',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        it('should give an error: jwt must be provided', function(done){
            request(app)
                .put(`/products/${idProduct}`)
                .set('token', '')
                .send({
                    name: 'test product edited',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(401);
                    expect(data.body.message).toEqual('jwt must be provided')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })

        it('should give an error: not authorized', function(done){
            request(app)
                .put(`/products/${idProduct}`)
                .set('token', access_token_not_admin)
                .send({
                    name: 'test product edited',
                    image_url: 'test url',
                    price: 1000,
                    stock: 1
                })
                .then(data => {
                    expect(data.status).toEqual(403);
                    expect(data.body.message).toEqual('not authorized')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        })
    })

    describe('DESTROY /products/:id', function(){
        it('should delete a product', function(done){
            request(app)
                .delete(`/products/${idProduct}`)
                .set('token', access_token)
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        });

        it('should give an error: jwt must be provided', function(done){
            request(app)
                .delete(`/products/${idProduct}`)
                .set('token', '')
                .then(data => {
                    expect(data.status).toEqual(401);
                    expect(data.body.message).toEqual('jwt must be provided')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        });

        it('should give an error: not authorized', function(done){
            request(app)
                .delete(`/products/${idProduct}`)
                .set('token', access_token_not_admin)
                .then(data => {
                    expect(data.status).toEqual(403);
                    expect(data.body.message).toEqual('not authorized')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        });
    })
})