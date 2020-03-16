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
