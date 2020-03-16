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

    describe('Fail to create product',function(){
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
                expect(status).toBe(400);
                expect(body).toHaveProperty('msg')
                expect(body.msg)
                done()
            })
        })
    })





})

describe('Find all data',function(){
    describe('succes find data',function(){
        it('Succesfully find all data', (done)=>{
            request(app)
            .get('/product')
        })
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(200)
            expect(body.msg).toHaveProperty('msg')
            done()
        })
    })
})
