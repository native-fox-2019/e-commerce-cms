const request = require('supertest')
const app = require('../app')
const { sequelize,Admin,Product } = require('../models')
const { queryInterface } = sequelize


let obj = {
    name : "Tag Heuer Carerra",
    image_url : "www.tagheuer.com",
    price : "20000000",
    stock : "5"
}

let objUpdate = {
    name : "Tag Heuer Carerra",
    image_url : "www.tagheuer.com",
    price : "20000000",
    stock : "4"
}

let objEmpty = {
    name : "Tag Heuer Carerra",
    image_url : "www.tagheuer.com",
    price : "",
    stock : "5"
}


let tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImR1bW15MkBlbWFpbC5jb20iLCJpZCI6MTE1LCJyb2xlcyI6ImFkbWluIiwiaWF0IjoxNTg0NzEzMzAyfQ.Fi4lcb_ELPjfO6Xf40JZHYwFW4V22uV2IJaJv_CyZfo"
let tokenUser = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZW1haWwuY29tIiwiaWQiOjExNiwicm9sZXMiOiJ1c2VyIiwiaWF0IjoxNTg0NzEzMzQ3fQ.b4e5761OULg4SFmz_NqHtkM9gkZhDKQa2eIqYsSTvk4"
let productId
let productEmpty = 20
let idDeleted = 4


afterAll(done=>{
    queryInterface
    .bulkDelete('Products',{})
    .then(()=>done())
    .catch(err=> done(err))
});

// view product
describe('view product success',function(){
    it('should return status 200 and result', function(done){
        request(app)
        .get('/product')
        .set({token: tokenAdmin})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(200)
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
})

describe('view product fail',function(){
    it('should return status 403 and error message, when its not login', function(done){
        request(app)
        .get('/product')
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 401 and error message when user roles are not admin',function(done){
        request(app)
        .get(`/product`)
        .set({token: tokenUser})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
})


//add product
describe('add product success',function(){
    it('should return status 201 and product',function(done){
        request(app)
        .post('/product')
        .set({token: tokenAdmin})
        .send(obj)
        .then(response=>{
            const { body,status } = response
            expect(status).toBe(201)
            expect(body.name).toBe("Tag Heuer Carerra")
            done()
            productId = body.id
            console.log(productId)
        })
        .catch(err=>{
            done(err)
        })

    })
})

describe('add product fails',function(){
    it('should return status 403 and error message, when its not login', function(done){
        request(app)
        .post('/product')
        .send(obj)
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 401 and error message when user roles are not admin',function(done){
        request(app)
        .post(`/product`)
        .set({token: tokenUser})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 400 and error message, when on of element empty',function(done){
        request(app)
        .post('/product')
        .set({token: tokenAdmin})
        .send(objEmpty)
        .then(response=>{
            const { body,status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})

//get one product
describe('get one product success',function(){
    it('should return status 200 and product',function(done){
        request(app)
        .get(`/product/${productId}`)
        .set({token: tokenAdmin})
        .then(response=>{
            const { body,status } = response
            expect(status).toBe(200)
            expect(body.name).toBe("Tag Heuer Carerra")
            done()
        })
        .catch(err=>{
            done(err)
        })

    })

})
describe('get one product fail',function(){
    it('should return status 403 and error message',function(done){
        request(app)
        .get(`/product/${productId}`)
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 401 and error message when user roles are not admin',function(done){
        request(app)
        .get(`/product/${productId}`)
        .set({token: tokenUser})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 404 and error message when product not found',function(done){
        request(app)
        .get(`/product/${productEmpty}`)
        .set({token: tokenAdmin})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(404)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
})

// update 
describe('update product success',function(){
    it('should return status 200 and success', function(done){
        request(app)
        .put(`/product/${productId}`)
        .set({token:tokenAdmin})
        .send(objUpdate)
        .then(response=>{
            const { body,status } = response;
            expect(status).toBe(200)
            done()
        })
    })
})

describe('update product fail',function(){
    it('should return status 403 and error message when not logged in',function(done){
        request(app)
        .put(`/product/${productId}`)
        .send(objUpdate)
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(403)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
    it('should return status 401 and error message when user roles are not admin',function(done){
        request(app)
        .put(`/product/${productId}`)
        .set({token: tokenUser})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 400 and error message, when one of element empty',function(done){
        request(app)
        .put(`/product/${productId}`)
        .set({token: tokenAdmin})
        .send(objEmpty)
        .then(response=>{
            const { body,status } = response
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err=>{
            done(err)
        })
    })

    
})

// delete
describe('delete product success',function(){
    it('should return status 200',function(done){
        request(app)
        .delete(`/product/${idDeleted}`)
        .set({token:tokenAdmin})
        .then(response=>{
            const { body,status } = response;
            expect(status).toBe(200)
            done()
        })

    })
})
describe('delete product fail',function(){
    it('should return status 403 and error message',function(done){
        request(app)
        .delete(`/product/${idDeleted}`)
        .then(response=>{
            const { body,status } = response;
            expect(status).toBe(403)
            done()
        })

    })
    it('should return status 401 and error message when user roles are not admin',function(done){
        request(app)
        .delete(`/product/${productId}`)
        .set({token: tokenUser})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(401)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })

    })
    it('should return status 404 and error message when product not found',function(done){
        request(app)
        .get(`/product/${idDeleted}`)
        .set({token: tokenAdmin})
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(404)
            expect(body).toHaveProperty('msg')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
})
