const request = require('supertest')
const app = require('../app')
const { sequelize,Admin,Product } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
require('dotenv').config()


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

let objAdmin = {
    name : "dummy2",
    email : "dummy2@email.com",
    password : "1234",
    roles : "admin"
}

let objUser = {
    name : "user",
    email : "user@email.com",
    password : "1234",
    roles : "user"
}

let tokenAdmin
let tokenUser
let productId = 5
let productEmpty = 20
let idDeleted = 4

beforeAll(done=>{
    queryInterface
    let admin = Admin.create(objAdmin)
    .then(()=>done())
    .catch(err=> done(err))
    
    let user = Admin.create(objUser)
    .then(()=>done())
    .catch(err=> done(err))
    let tokenA = jwt.sign({email:admin.email,id:admin.id,roles:admin.roles},process.env.JWT_KEY)
    let tokenU = jwt.sign({email:user.email,id:user.id,roles:user.roles},process.env.JWT_KEY)
    tokenAdmin = tokenA
    tokenUser = tokenU
})

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
