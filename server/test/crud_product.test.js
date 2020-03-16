const request= require('supertest');
const app = require('../app');
const {sequelize, Todo} = require('../models/index');
const {queryInterface} = sequelize;

afterAll(done =>{
    queryInterface
    .bulkDelete('Products', {})
    .then(()=>done())
    .catch(err=>done(err))
});

describe('Create a new product ',function(){
    describe('Succesfully create product',function(){
        it('should return 200 and object (message,product)', (done)=>{
            request(app)
            .post('/product')
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:10000,
                stock:50
            })
            .then(res=>{
                const {body,status} = res;
                expect(status).toBe(200);
                expect(body).toHaveProperty('name','testName');
                expect(body).toHaveProperty('image_url','Test imageUrl');
                expect(body).toHaveProperty('price',10000);
                expect(body).toHaveProperty('stock',50);
                done()
            })  
        })
    })

    describe('Fail to create object because stock is 0',function(){
        it('Should return 400 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:10000,
                stock:0
            })
            .then(res=>{
                const {body,status} = res;
                const expected = ["Product's Stock cannot be empty"]
                expect(status).toBe(400);
                expect(body).toHaveProperty('msg')
                expect(body.msg).toEqual(expect.arrayContaining(expected))
                expect(body.msg)
                done()
            })
        })
    })

    describe('Fail to create object because price is negative value',function(){
        it('Should return 400 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:-1,
                stock:0
            })
            .then(res=>{
                const {body,status} = res;
                const expected = ["Price cannot be negative value"]
                expect(status).toBe(400);
                expect(body).toHaveProperty('msg')
                expect(body.msg).toEqual(expect.arrayContaining(expected))
                expect(body.msg)
                done()
            })
        })
    })

    describe('Fail to create object because price is negative value',function(){
        it('Should return 400 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:-1,
                stock:0
            })
            .then(res=>{
                const {body,status} = res;
                const expected = ["Price cannot be negative value"]
                expect(status).toBe(400);
                expect(body).toHaveProperty('msg')
                expect(body.msg).toEqual(expect.arrayContaining(expected))
                expect(body.msg)
                done()
            })
        })
    })

    describe('Fail to create object because price is negative value',function(){
        it('Should return 400 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:-1,
                stock:0
            })
            .then(res=>{
                const {body,status} = res;
                const expected = ["Price cannot be negative value"]
                expect(status).toBe(400);
                expect(body).toHaveProperty('msg')
                expect(body.msg).toEqual(expect.arrayContaining(expected))
                expect(body.msg)
                done()
            })
        })
    })


})
