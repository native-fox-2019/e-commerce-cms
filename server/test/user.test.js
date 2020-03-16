const request = require('supertest');
const app = require('../app.js');
const jwt = require('jsonwebtoken');

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
})
