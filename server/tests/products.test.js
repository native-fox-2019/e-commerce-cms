const response = require('supertest')
const request = require('supertest')
const app = require('../app')
const jwt = require('../helpers/jwt')
const { sequelize, products, users } = require('../models')
const { queryInterface } = sequelize;


let access_token;
let access_token_not_admin;
let idProduct;

beforeAll((done) => {
  users.create({
    email: 'test2@mail.com',
    password: 'test2',
    role: 'admin'
  })
    .then(data => {
      let token = jwt.jwtSign({
        id: data.id,
        email: data.email
      })

      access_token = token;

    })


  afterAll(done => {
    queryInterface
      .bulkDelete('products', {})
      .then(() => done())
      .catch(err => done(err));
  })

  describe('POST /products', function () {
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
})