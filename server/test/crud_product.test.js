const request= require('supertest');
const app = require('../app');
const {sequelize, Products} = require('../models/index');
const {queryInterface} = sequelize;

afterAll(done =>{
    queryInterface
    .bulkDelete('Products', {})
    .then(()=>done())
    .catch(err=>done(err))
});
let id = null
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
                id=body.id
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
        it('should return 200', (done)=>{
            request(app)
            .get('/product')
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(200)
            done()
            })
        })
    })

})

describe('update Data', ()=>{
    describe('success update data', ()=>{
        it('should return 200 and object (message,product)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .send({
                name:'testName 20 999',
                image_url:'Test imageUrlz',
                price:10000,
                stock:1
            })
            .then(data=>{
                const {body,status}= data
                expect(status).toBe(200)
                expect(body).toHaveProperty('msg')
                expect(body).toHaveProperty('data')
                done()
            })
        })
    })

    describe('failed update data because data is not found', ()=>{
        it('should return 404 and object (error)', (done)=>{
            request(app)
            .put('/product/666')
            .send({
                name:'testName 20 999',
                image_url:'Test imageUrl',
                price:10000,
                stock:1
            })
            .then(data=>{
                const {body,status}= data
                expect(status).toBe(404)
                expect(body).toHaveProperty('msg')
                done()
            })
        })
    })

    describe('failed update data because bad request', ()=>{
        it('should return 400 and object (error)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .send({
                name:'',
                image_url:'',
                price:-100,
                stock:-20
            })
            .then(data=>{
                const {body,status}= data
                expect(status).toBe(400)
                expect(body).toHaveProperty('msg')
                done()
            })
        })
    })

})



describe('delete data',()=>{
    describe('succes delete data',()=>{
        it("should return 200 and object(product)", (done)=>{
            request(app)
            .delete(`/product/${id}`)
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(200)
            expect(body).toHaveProperty("msg")
            expect(body).toHaveProperty("name")
            expect(body).toHaveProperty("image_url")
            expect(body).toHaveProperty("price")
            expect(body).toHaveProperty("stock")
            done()
        })
    })
})

    describe('failed delete data',()=>{
        it('should return 404 and object(error)', (done)=>{
            request(app)
            .delete(`/product/9202`)
        .then(result=>{
            const {body,status} = result
            expect(status).toBe(404)
            expect(body).toHaveProperty("msg")
            done()
        })
    })
})
    
})