const response = require('supertest')
const request = require('supertest')
const app = require('../app')
const jwt = require('../helpers/jwt')
const { sequelize, products, users } = require('../models')
const { queryInterface } = sequelize;


let access_token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3MywiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSJ9LCJpYXQiOjE1ODQ3ODU2NTR9.Tnfo7KgrPw-_h-tXjd4lSFl6qFPhZnxRHdumUXxwi98"
let access_token_not_admin;
let idProduct;

beforeAll(done => {
  users.create({
    email: 'test2@mail.com',
    password: 'test2',
    role: 'admin'
  })
    .then(user => {
        console.log("ini token",token)
    })
  })
  console.log("ini ac.token",access_token)
    afterAll(done => {
      queryInterface
        .bulkDelete('products', {})
        .then(() => done())
        .catch(err => done(err));
    })
  
    describe('POST /product', function () {
      it('add product', function (done) {
        request(app)
          .post('/product')
          .set('token', access_token)
          .send({
            name: 'test product',
            image_url: 'image_url.com',
            price: 1000,
            stock: 1
          })
          .then(data => {
            idProduct = data.body.id
            expect(data.status).toBe(201);
            done()
          })
          .catch(err => {
            done(err)
          })
      })
    })

  
  