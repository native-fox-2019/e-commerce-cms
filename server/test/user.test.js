const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(done => {
    queryInterface
    .bulkDelete('Users', {})
    .then(() => done())
    .catch(err => done(err));
})

describe('Test for users', function() {
    describe('Success register user as admin', function() {
        it('Should return 201', function(done) {
          request(app)
            .post('/users/registeradmin')
            .send({
                name: 'john',
                email: 'test@email.com',
                password : '1234',
                superpassword : 'password1234'
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(201)
                expect(body).toContain('john')
                done()
            })
            .catch(err=>{
                done(err)
            })
        });
      });
      
      describe('Failed register as admin', function() {
        it('Should return 400 because email has been registered', function(done) {
            request(app)
              .post('/users/registeradmin')
              .send({
                  name: 'john',
                  email: 'test@email.com',
                  password : '1234',
                  superpassword : 'password1234'
              })
              .then(res => {
                  const { body, status } = res
                  expect(status).toEqual(400)
                  expect(body).toHaveProperty('message')
                  expect(body.message).toContain(`Your email has been registered`)
                  done()
              })
              .catch(err=>{
                  done(err)
              })
          });

        it('Should return 400 because not have name', function(done) {
          request(app)
            .post('/users/registeradmin')
            .send({
                name: null,
                email: 'test@email.com',
                password : '1234',
                superpassword : 'password1234'
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body).toHaveProperty('message')
                expect(body.message).toContain('Name cannot be empty')
                done()
            })
            .catch(err=>{
                done(err)
            })
        });

        it('Should return 403 because wrong superpassword', function(done) {
            request(app)
                .post('/users/registeradmin')
                .send({
                    name: 'john',
                    email: 'test@email.com',
                    password : '1234',
                    superpassword : 'password123'
                })
                .then(res => {
                    const { body, status } = res
                    expect(status).toEqual(403)
                    expect(body).toHaveProperty('message')
                    expect(body.message).toContain('Forbidden')
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        });
        

        it('Should return 400 because not have email', function(done) {
            request(app)
              .post('/users/registeradmin')
              .send({
                  name: 'john',
                  email: null,
                  password : '1234',
                  superpassword : 'password1234'
              })
              .then(res => {
                  const { body, status } = res
                  expect(status).toEqual(400)
                  expect(body).toHaveProperty('message')
                  expect(body.message).toContain('Email cannot be empty')
                  done()
              })
              .catch(err=>{
                  done(err)
              })
          });

          it('Should return 400 because not have password', function(done) {
            request(app)
              .post('/users/registeradmin')
              .send({
                  name: 'john',
                  email: 'test@email.com',
                  password : null,
                  superpassword : 'password1234'
              })
              .then(res => {
                  const { body, status } = res
                  expect(status).toEqual(400)
                  expect(body).toHaveProperty('message')
                  expect(body.message).toContain('Password cannot be empty')
                  done()
              })
              .catch(err=>{
                  done(err)
              })
          });
      });

      describe('Success login as admin', function() {
        it('Should return 200', function(done) {
          request(app)
            .post('/users/login')
            .send({
                email: 'test@email.com',
                password : '1234'
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(200)
                expect(body).toHaveProperty('access_token')
                done()
            })
            .catch(err=>{
                done(err)
            })
        });
      });

      describe('Failed login as admin', function() {
        it('Should return 400 because wrong password', function(done) {
          request(app)
            .post('/users/login')
            .send({
                email: 'test@email.com',
                password : '12345'
            })
            .then(res => {
                const { body, status } = res
                expect(status).toEqual(400)
                expect(body.message).toContain('Wrong email or password')
                done()
            })
            .catch(err=>{
                done(err)
            })
        });

        it('Should return 400 because email not found', function(done) {
            request(app)
              .post('/users/login')
              .send({
                  email: 'test2@email.com',
                  password : '1234'
              })
              .then(res => {
                  const { body, status } = res
                  expect(status).toEqual(400)
                  expect(body.message).toContain('Wrong email or password')
                  done()
              })
              .catch(err=>{
                  done(err)
              })
          });
      });
})
