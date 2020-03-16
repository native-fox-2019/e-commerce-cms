const request= require('supertest');
const app = require('../app');
const {sequelize, Products} = require('../models/index');
const {queryInterface} = sequelize;

let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FicmllbCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6ImFkbWluIiwiaWF0IjoxNTg0MzYzMjUzfQ.B87QFgxvI7jXZlFPx1FAMRU0mWZycOckq05GH_tWoTk'
let tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FicmllbDIiLCJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJsZXZlbCI6InVzZXIiLCJpYXQiOjE1ODQzNjMzNDB9.IFdaKJJItUpzfuBlfszcQgNPQr_ixVqvwVHN_kcScMM'

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
            .set('token', tokenAdmin)
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
            .catch(err=>{
                console.log(err)
                
            })
        })
    })

    describe('Fail to create product',function(){
        it('Should return 400 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .set('token', tokenAdmin)
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
            .catch(err=>{
                console.log(err)
                
            })
        })
    })


    describe('fail to create product because of invalid credential', ()=>{
        it('should return 403 and  object(error)',(done)=>{
            request(app)
            .post('/product')
            .set('token',tokenAdmin)
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
                done()
            })
            .catch(err=>{
                console.log(err)
                
            })
        })
    })

    





})

describe('Find all data',function(){
    describe('succes find data with admin credential',function(){
        it('should return 200', (done)=>{
            request(app)
            .get('/product')
            .set('token', tokenAdmin)
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(200)
            done()
            })
            .catch(err=>{
                console.log(err)
                
            })
        })
    })
    describe('succes find data with user credential',function(){
        it('should return 200', (done)=>{
            request(app)
            .get('/product')
            .set('token', tokenUser)
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(200)
            done()
            })
            .catch(err=>{
                console.log(err)
               
            })
        })
    })

    describe('failed to get data because of authentication failure',function(){
        it('should return 200', (done)=>{
            request(app)
            .get('/product')
       
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(403)
            done()
            })
            .catch(err=>{
                console.log(err)
              
            })
        })
    })

})

describe('update Data', ()=>{
    describe('success update data', ()=>{
        it('should return 200 and object (message,product)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .set('token', tokenAdmin)
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
            .catch(err=>{
                console.log(err)
                
            })
        })
    })

    describe('failed update data because data is not found', ()=>{
        it('should return 404 and object (error)', (done)=>{
            request(app)
            .put('/product/666')
            .set('token', tokenAdmin)
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
            .catch(err=>{
                console.log(err)
            
            })
        })
    })

    describe('failed update data because bad request', ()=>{
        it('should return 400 and object (error)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .set('token', tokenAdmin)
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
            .catch(err=>{
                console.log(err)
                
            })
        })
    })

})



describe('delete data',()=>{
    describe('succes delete data',()=>{
        it("should return 200 and object(product)", (done)=>{
            request(app)
            .delete(`/product/${id}`)
            .set('token', tokenAdmin)
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
        .catch(err=>{
            console.log(err)
            
        })
    })
})

    describe('failed delete data',()=>{
        it('should return 404 and object(error)', (done)=>{
            request(app)
            .delete(`/product/9202`)
            .set('token', tokenAdmin)
        .then(result=>{
            const {body,status} = result
            expect(status).toBe(404)
            expect(body).toHaveProperty("msg")
            done()
        })
        .catch(err=>{
            console.log(err)
            
        })
    })
})
    
})