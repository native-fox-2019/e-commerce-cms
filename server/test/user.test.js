const request = require('supertest');
const app = require('../app.js');
const{User, sequelize} = require('../models');
const {queryInterface} = sequelize;

afterAll(done=>{
    queryInterface
        .bulkDelete('Users', {})
        .then(()=> done())
        .catch(err=> done(err));
})

describe('User routes', function(){
    describe('POST /users/register', function() {
        it('should create a new user', function(done){
        request(app)
            .post('/users/register')
            .send({email: 'test@mail.com', password: '123', username: 'test'})
            .then(data => {
                expect(data.status).toEqual(201)
                done()
            })
            .catch(err=>{
                done(err)
            })
        });

        it('should give an error: email is empty', function(done){
            request(app)
                .post('/users/register')
                .send({email: null, password: '123', username: 'test'})
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Email is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });

        it('should give an error: password is empty', function(done){
            request(app)
                .post('/users/register')
                .send({email: 'test@mail.com', password: null, username: 'test'})
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Password is empty')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: username is empty', function(done){
        request(app)
            .post('/users/register')
            .send({email: 'test@mail.com', password: '123', username: null})
            .then(data => {
                expect(data.status).toEqual(400);
                expect(data.body.message).toContain('Username is empty')
                done()
            })
            .catch(err=>{
                done(err)
            })
        });
    });

    describe('POST /users/login', function(){
        it('should login', function(done){
            request(app)
                .post('/users/login')
                .send({email: 'test@mail.com', password: '123'})
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: wrong email/password', function(done){
            request(app)
                .post('/users/login')
                .send({email: 'test@mail.com', password: '1235'})
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Wrong email/password')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
    })

    describe('POST /users/adminRegister', function() {
        it('should create a new user', function(done){
        request(app)
            .post('/users/adminRegister')
            .send({email: 'test2@mail.com', password: '123', username: 'test'})
            .then(data => {
                expect(data.status).toEqual(201)
                done()
            })
            .catch(err=>{
                done(err)
            })
        });
    });

    describe('POST /users/adminLogin', function(){
        it('should login', function(done){
            request(app)
                .post('/users/adminLogin')
                .send({email: 'test2@mail.com', password: '123'})
                .then(data => {
                    expect(data.status).toEqual(200);
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: wrong email/password', function(done){
            request(app)
                .post('/users/adminLogin')
                .send({email: 'test2@mail.com', password: '1235'})
                .then(data => {
                    expect(data.status).toEqual(400);
                    expect(data.body.message).toContain('Wrong email/password')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
        it('should give an error: You are not admin', function(done){
            request(app)
                .post('/users/adminLogin')
                .send({email: 'test@mail.com', password: '123'})
                .then(data => {
                    expect(data.status).toEqual(403);
                    expect(data.body.message).toContain('You are not admin')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
            });
        
    })
})
