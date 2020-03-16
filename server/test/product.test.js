const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize





let token = null
beforeAll(done => {
  User.create({
    username: 'user',
    email: 'user@gmail.com',
    role: 'user',
    password: '1234567',

  })
    .then(data => {
      // console.log(data, '<<<< ini apa')
      token = data.body
      done()
    })

})

// delete all User after all test
afterAll(done => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch(err => {
      done(err)
    })
})

describe('coba token', function () {
  it('token', function () {
    // console.log(token, '<<<<<<< cek token ga nih????')
  })
})