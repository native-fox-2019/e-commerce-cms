const request= require('supertest');
const app = require('../app');
const {sequelize, Products} = require('../models/index');
const {queryInterface} = sequelize;

let tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZ2FicmllbCIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6ImFkbWluIiwiaWF0IjoxNTg0NzgxNjU0fQ.ANXYxFIvyEmF1UdoVp3Vx_eblXIP_Lglz_1eokKkYJM'
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
            
        })
    })

    describe('Fail to create product because of invalid input',function(){
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
           
        })
    })

    describe('Fail to create product becase of token / authentification',function(){
        it('Should return 403 and object (Error)', (done)=>{
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
                expect(status).toBe(403);
                expect(body).toHaveProperty('msg')
                expect(body.msg)
                done()
            })
          
        })
    })

    describe('Fail to create product becase of invalid credential',function(){
        it('Should return 403 and object (Error)', (done)=>{
            request(app)
            .post('/product')
            .set("token",tokenUser)
            .send({
                name:'testName',
                image_url:'Test imageUrl',
                price:10000,
                stock:2
            })
            .then(res=>{
                const {body,status} = res;
                expect(status).toBe(403);
                expect(body).toHaveProperty('msg')
                expect(body.msg)
                done()
            })
          
        })
    })

})

describe('Find all data ',function(){
    describe('succes find data with User credential',function(){
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

    describe('succes find data with Admin credential',function(){
        it('should return 200 ', (done)=>{
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
            .set("token",tokenAdmin)
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
            .set("token",tokenAdmin)
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
            .set("token",tokenAdmin)
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


    describe('failed update data because of authorization error', ()=>{
        it('should return 403 and object (message,product)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .set("token",tokenUser)
            .send({
                name:'testName 20 999',
                image_url:'Test imageUrlz',
                price:10000,
                stock:1
            })
            .then(data=>{
                const {body,status}= data
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg')
                
                done()
            })
          
        })
    })

    describe('failed update data because authentification error', ()=>{
        it('should return 403 and object (message,product)', (done)=>{
            request(app)
            .put(`/product/${id}`)
            .set("token",tokenUser)
            .send({
                name:'testName 20 999',
                image_url:'Test imageUrlz',
                price:10000,
                stock:1
            })
            .then(data=>{
                const {body,status}= data
                expect(status).toBe(403)
                expect(body).toHaveProperty('msg')
                
                done()
            })
          
        })
    })


})



    describe('get data by certain Product ID',()=>{
        describe('succesfully get data by id with Admin authorization',()=>{
            it('should return 200 and  object(product)',(done)=>{
                request(app)
                .get(`/product/${id}`)
                .then(result=>{
                    const {body,status} = result
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")    
                    done()
                })
            })
        })

        describe('succesfully get data by id with User authorization',()=>{
            it('should return 200 and  object(product)',(done)=>{
                request(app)
                .get(`/product/${id}`)
                .then(result=>{
                    const {body,status} = result
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("name")
                    expect(body).toHaveProperty("image_url")
                    expect(body).toHaveProperty("price")
                    expect(body).toHaveProperty("stock")    
                    done()
                })
            })
        })
        describe('Cannot get because data not found',()=>{
            it('should return 404 and  object(product)',(done)=>{
                request(app)
                .get(`/product/9999999`)
                .set("token",tokenUser)
                .then(result=>{
                    const {body,status} = result
                    expect(status).toBe(404)
                    expect(body).toHaveProperty("msg")   
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
            .set("token",tokenAdmin)
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

    describe('failed delete data because of id not found',()=>{
        it('should return 404 and object(error)', (done)=>{
            request(app)
            .delete(`/product/9202`)
            .set("token",tokenAdmin)
        .then(result=>{
            const {body,status} = result
            expect(status).toBe(404)
            expect(body).toHaveProperty("msg")
            done()
        })
    
    })
})
    describe('failed delete data because of authorization error',()=>{
        it("should return 403 and object(error)", (done)=>{
            request(app)
            .delete(`/product/${id}`)
            .set("token",tokenUser)
        .then(result=>{
            const {body,status}=result
            expect(status).toBe(403)
            expect(body).toHaveProperty("msg")
            
            done()
        })
    
    })
})
describe('failed delete data because of authentification error',()=>{
    it("should return 403 and object(error)", (done)=>{
        request(app)
        .delete(`/product/${id}`)
        .set("token",null)
    .then(result=>{
        const {body,status}=result
        expect(status).toBe(403)
        expect(body).toHaveProperty("msg")
      
        done()
    })

})
})


})