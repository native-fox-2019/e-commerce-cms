const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


afterAll(done=>{
    queryInterface
    .bulkDelete('Admins',{})
    .then(()=>done())
    .catch(err=> done(err))
});

let obj = {
    name : "admin2",
    email : "admin2@email.com",
    password : "1234",
    roles : "admin"
}


describe('register success', function(){
    it('should return status 201 and expected body', function(done){
        request(app)
        .post('/user/register')
        .send(obj)
        .then(response =>{
            const { body, status } = response;
            expect(status).toBe(201)
            expect(body.name).toBe('admin2')
            expect(body.email).toBe('admin2@email.com')
            expect(body.roles).toBe('admin')
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
})

let obj2 = {
    name : "admin",
    email : "",
    password : "1234",
    roles : "admin"
}

describe('register error',function(){
    it('should return status 400 and error message', function(done){
        request(app)
        .post('/user/register')
        .send(obj2)
        .then(response=>{
            const { body,status } = response;
            expect(status).toBe(400)
            done()
        })
        .catch(err =>{
            done(err)
        })
    })
})

let obj3={
    email : "admin2@email.com",
    password : "1234"
}

describe('login success',function(){
    it('should return status 200 and access token',function(done){
        request(app)
        .post('/user/login')
        .send(obj3)
        .then(response=>{
            const { body,status } = response;
            expect(status).toBe(200)
            
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})

let obj4={
    email : "admin2@email.com",
    password : "1233"
}

describe.only('login fail',function(){
    it('should return status 400 and error message',function(done){
        request(app)
        .post('/user/login')
        .send(obj4)
        .then(response=>{
            const { body,status } = response;
            console.log(body)
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg');
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
})