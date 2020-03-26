const request = require('supertest')
const app = require('../app')
const {sequelize, users} = require('../models');
const {queryInterface} = sequelize;

afterAll(done =>{
    queryInterface
    .bulkDelete('users', {})
    .then(()=>done())
    .catch(err=>done(err))
});

describe('Create User register', function () {
    describe('POST /users/register', function () {
      it('responds status code 201 success', function (done) {
        let register = {
          email: "test2@mail.com",
          role: "Admin",
          password: 'test2'
        }
        request(app)
          .post('/user/register')
          .send(register)
          .expect(201)
          .then(({ body, status }) => {
            expect(status).toBe(201)
            expect(typeof body).toBe("object")
            expect(body).toBeDefined()
            expect(body).toHaveProperty("token")
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })
})

describe('Error invalid email', function () {
    it('responds status code 400 bad request invalid email', function (done) {
      let register = {
        email: "test3@mail.com",
        role: "Admin",
        password: ""
      }
      request(app)
        .post('/user/register')
        .send(register)
        .expect(401)
        .then(({ body, status }) => {
          expect(status).toBe(401)
          expect(body.msg).toBe('email and password must be filled')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Login user test', function () {
    describe('POST user/login', function () {
  
      it('response 200 log', function (done) {
        let login = {
          email: 'test2@mail.com',
          password: 'test2'
        }
        request(app)
          .post('/user/login')
          .send(login)
          .expect(200)
          .then(({ body, status }) => {
            expect(status).toBe(200)
            expect(body).toBeDefined()
            expect(body).toHaveProperty("token")
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })
  })
  
  describe('login error test', function () {
    describe('login error 500 wrong username', function () {
  
      it('error 500 internal server error', function (done) {
        let login = {
          email: '',
          password: 'test2'
        }
        request(app)
          .post('/user/login')
          .send(login)
          .expect(500)
          .then(({ body, status }) => {
            expect(status).toBe(500)
            expect(body.msg).toBe('internal server error')
            done()
          })
          .catch(err => {
            done(err)
          })
    })
})
  })
