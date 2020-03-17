const request = require('supertest')
const app = require('../app')
const { sequelize, User, Product } = require('../models')
const { queryInterface } = sequelize
const { generatingJWT, veryfingJWT } = require('../helpers/jwt')

// let tokenAdmin = null
let tokenUser = null
//test kalo CRUD PRODUCT
// - rolenya bukan admin (tokennya ada didatabse tapi rolenya user bukan admin)
// - kalau usernya gak ada (kau bawa token user yang idnya gak ada di database)
// - kalau usernya gak login (gak bawa token)
// di beforeAll request(app).post("/login")
//response.body.token
// beforeAll(done => {
//   let fakeLoginAdmin = {
//     id: 1,
//     email: 'admin@gmail.com',
//     role: "admin"
//   }
//   tokenAdmin = generatingJWT(fakeLoginAdmin)

//   let fakeLoginUser = {
//     id: 1,
//     email: 'user@gmail.com',
//     role: 'user'
//   }
//   tokenUser = generatingJWT(fakeLoginUser)


//   Product
//     .create({
//       id: 1,
//       name: 'Tshirt',
//       image_url: 'okok.jpg',
//       price: 1000,
//       stock: 10
//     })
//     .then(() => {
//       done()
//     })
//     .catch(err => [
//       done(err)
//     ])
// })

// delete all User after all test
// afterAll(done => {
//   queryInterface
//     .bulkDelete("Users", {})
//     .then(() => done())
//     .catch(err => {
//       done(err)
//     })
// })

afterAll(done => {
  User.destroy({ where: { email: 'user@gmail.com' } })
    .then(() => done())
    .catch(err => done(err));
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


  describe('Error Register empty username, empty email, wrong password', function () {
    it('Error Registerresponds status code 400 bad request', function (done) {
      let register = {
        username: null,
        email: "",
        role: "user",
        password: '1234'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('username cannot be empty')
          expect(body[1]).toBe('Password must be at least 5 characters')
          expect(body[2]).toBe("email cannot be empty")

          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('Error invalid email', function () {
    it('responds status code 400 bad request invalid email', function (done) {
      let register = {
        username: 'user',
        email: "user@",
        role: "user",
        password: '1234567'
      }
      request(app)
        .post('/users/register')
        .send(register)
        .expect(400)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('email invalid')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })

  describe('register email is already in use', function () {
    // it('resgister 200 response first', function (done) {
    //   let register = {
    //     username: 'user',
    //     email: "user@gmail.com",
    //     role: "user",
    //     password: '1234567'
    //   }
    //   request(app)
    //     .post('/users/register')
    //     .send(register)
    //     .then(({ body, status }) => {
    //       done()
    //     })
    //     .catch(err => {
    //       done(err)
    //     })
    // })

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