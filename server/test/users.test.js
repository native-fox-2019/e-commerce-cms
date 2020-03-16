const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize





// delete all User after all test
afterAll(done => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch(err => {
      done(err)
    })
})



describe('Create User register', function () {
  describe('POST /users/register', function () {
    it('responds status code 201 success', function (done) {
      let register = {
        username: "user",
        email: "user@gmail.com",
        role: "user",
        password: '1234567'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(201)
        .then(({ body, status }) => {
          expect(status).toBe(201)
          expect(typeof body).toBe("string")
          expect(body).toBeDefined()
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })


  describe('Error Register empty username', function () {
    it('responds status code 400 bad request', function (done) {
      let register = {
        username: null,
        email: "user@gmail.com",
        role: "user",
        password: '1234567'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('column cannot be empty')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Error Register password', function () {
    it('responds status code 400 bad request', function (done) {
      let register = {
        username: 'user',
        email: "user@gmail.com",
        role: "user",
        password: '123'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('Password must be at least 5 characters')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('register email is already in use', function () {
    it('resgister 200 response first', function (done) {
      let register = {
        username: 'user',
        email: "user@gmail.com",
        role: "user",
        password: '1234567'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .then(({ body, status }) => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('resgister 400 response email is already in use', function (done) {
      let register = {
        username: 'user',
        email: "user@gmail.com",
        role: "user",
        password: '1234567'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('email is already in use')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })


})


describe('Login user test', function () {
  describe('POST users/login', function () {

    it('response 200 log', function (done) {
      let login = {
        email: 'user@gmail.com',
        password: '1234567'
      }
      request(app)
        .post('/users/login')
        .send(login)
        .expect(200)
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(typeof body).toBe("string")
          expect(body).toBeDefined()
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})

describe('login error test', function () {
  describe('login error 400 wrong username', function () {

    it('error 400 no username', function (done) {
      let login = {
        email: '',
        password: '1234567'
      }
      request(app)
        .post('/users/login')
        .send(login)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body).toBe('Your email or password is incorrect')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('error 400 no password', function (done) {
      let login = {
        email: 'user',
        password: ''
      }
      request(app)
        .post('/users/login')
        .send(login)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body).toBe('Your email or password is incorrect')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
})