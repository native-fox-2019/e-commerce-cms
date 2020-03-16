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
    it('responds status code 201 and object', function (done) {
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
        .then(({ body }) => {
          expect(typeof body).toBe('string')
          expect(body).toBeDefined()
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('Error Register', function () {
    it('responds status code 400 bad request', function (done) {
      let register = {
        username: null,
        email: "user@gmail.com",
        role: "user",
        password: '123'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(response => {
          console.log(response, '<<<<<<< cari error')
        })
        .catch(err => {
          done(err)
        })
    })
  })

})