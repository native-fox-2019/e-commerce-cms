const response = require('supertest')
const app = require('../app')
const { generatingJWT } = require('../helpers/jwt')
const { sequelize, Product } = require('../models')



let token = null

// beforeAll(done => {
//   let fakeLogin = {
//     id: 1,
//     email: 'user@gmail.com'
//   }
//   token = generatingJWT(fakeLogin)
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
afterAll(done => {
  Product.destroy({ where: {} })
    .then(() => {
      done()
    })
    .catch(err => {
      done(err)
    })

})

describe('CRUD product admin', function () {
  describe('Add product', function () {
    it.only('response status code 201 created Add product', function (done) {
      let item = {
        name: 'Tshirt',
        image_url: 'okok2222.jpg',
        price: 1000,
        stock: 10
      }
      response(app)
        .post('/products')
        // .set("token", token)
        .send(item)
        .then(({ body, status }) => {
          console.log(status, '<<<<<<<<< res add product')
          expect(status).toBe(201)
          done()
        })
        .catch(err => {
          console.log(err, "<<<<<<< error ????????")
          done(err)
        })
    })
  })
})