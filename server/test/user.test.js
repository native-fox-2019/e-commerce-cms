const request = require('supertest')
const app = require('../app')
const {sequelize, User} = require('../models/index');
const {queryInterface} = sequelize;

afterAll(done =>{
    queryInterface
    .bulkDelete('Users', {})
    .then(()=>done())
    .catch(err=>done(err))
});



describe('User register',()=>{
    describe('Success register user',()=>{
        it('should return 200 and object (token,name,level)',(done)=>{
            request(app)
            .post('/user/register')
            .send({
                name:"gabriel geovrisco2",
                email:"geovrisco3@gmail.com",
                password:"testsa",
                level:"admin"
            })
            .then(result=>{
                const {status,body}=result
                expect(status).toBe(200)
                expect(body).toHaveProperty("token")
                expect(body).toHaveProperty("name")
                expect(body).toHaveProperty("level")
                // token = body.token
                done()
            })
            
        })
    })

    describe('failed register user',()=>{
        it('should return 400 and error (object)', (done)=>{
            request(app)
            .post('/user/register')
            .send({
                name:"",
                email:"gmailajacom",
                password:"t",
                level:""
            })
            .then(result=>{
                const {status,body}=result
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg")
                done()
            })
            
        })
    })

    // REGISTER FAILED KARENA 2 KALI EMAIL SAMA

    describe('failed register user because of email already registered',()=>{
        it('should return 400 and error (object)', (done)=>{
            request(app)
            .post('/user/register')
            .send({
                name:"gabriel geovrisco2",
                email:"geovrisco3@gmail.com",
                password:"testsa",
                level:"admin"
            })
            .then(result=>{
                const {status,body}=result
                expect(status).toBe(400)
                expect(body).toHaveProperty("msg")
                done()
            })
           
        })
    })

} )


describe('User login',()=>{
    describe('succesful user login',()=>{
        it('should return 200 and object(token,name,level)',(done)=>{
            request(app)
            .post('/user/login')
            .send({
                email:"geovrisco3@gmail.com",
                password:"testsa",
            })
            .then(result=>{
                const {status,body}=result
                expect(status).toBe(200)
                expect(body).toHaveProperty("token")
                expect(body).toHaveProperty("level")
                expect(body).toHaveProperty("name")
                done()
            })
           
        })
    })

    describe('failed user login',()=>{
        it('should return 401 and object(err)',(done)=>{
            request(app)
            .post('/user/login')
            .send({
          
                email:"geovrisco3@gmail.com",
                password:"testsaaaaa",
                
            })
            .then(result=>{
                const {status,body}=result
                expect(status).toBe(401)
                expect(body).toHaveProperty("msg")
                done()
            })
            
        })
    })


})