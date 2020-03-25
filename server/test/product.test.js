const response = require('supertest')
const request = require('supertest')
const app = require('../app')
const { generatingJWT } = require('../helpers/jwt')
const { sequelize, Product, User } = require('../models')


let tokenAdmin = null
beforeAll(done => {
  User
    .findOne({ where: { email: "admin@gmail.com" } })
    .then(user => {
      let payload = { id: user.id, email: user.email, role: user.role }
      tokenAdmin = generatingJWT(payload)
      done()
    })
    .catch(err => {
      done(err)
    })

  Product
    .create({
      id: 1,
      name: 'Anu',
      image_url: 'image.jpg',
      price: 1000,
      stock: 10
    })

})

afterAll(done => {
  Product.destroy({ where: {} })
    .then(() => {
      done();
    }).catch(err => {
      done(err);
    })
});

describe('CRUD product admin', function () {
  describe('add product admin', function () {
    it('add product response 201 created products', function (done) {
      let item = {
        name: 'vibrator',
        image_url: 'image-kangen.jpg',
        price: 1000,
        stock: 1
      }
      response(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(item)
        .then(({ body, status }) => {
          expect(status).toBe(201)
          expect(typeof body).toBe('object')
          expect(body).toHaveProperty('name')
          expect(body).toHaveProperty('image_url')
          expect(body).toHaveProperty('price')
          expect(body).toHaveProperty('stock')
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('Error add product bad request 400', function (done) {
      let item = {
        name: '',
        image_url: 'image-kangen.jpg',
        price: null,
        stock: 1
      }
      response(app)
        .post('/products')
        .set('token', tokenAdmin)
        .send(item)

        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('column price cannot be empty')
          expect(body[1]).toBe('column name cannot empty')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('get all product', function () {
    it('GET /product success 200', function (done) {
      response(app)
        .get('/products')
        .set('token', tokenAdmin)
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(Array.isArray(['body'])).toBe(true);
          expect(body[0]).toHaveProperty('name');
          expect(body[0]).toHaveProperty('image_url');
          expect(body[0]).toHaveProperty('price');
          expect(body[0]).toHaveProperty('stock');
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('get one update product', function () {
    it('Get /products/:id rsponse 200 ok', function (done) {
      let itemEdit = {
        name: 'editedItems',
        image_url: 'image.jpg',
        price: 1200,
        stock: 10
      }
      response(app)
        .put('/products/1')
        .set('token', tokenAdmin)
        .send(itemEdit)
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(body).toHaveProperty('name');
          expect(body).toHaveProperty('image_url');
          expect(body).toHaveProperty('price');
          expect(body).toHaveProperty('stock');
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    it('error respon update', function (done) {
      let itemEdit = {
        name: '',
        image_url: 'image.jpg',
        price: null,
        stock: 10
      }
      response(app)
        .put('/products/1')
        .set('token', tokenAdmin)
        .send(itemEdit)
        .then(({ body, status }) => {
          expect(status).toBe(400)
          expect(body[0]).toBe('column price cannot be empty')
          expect(body[1]).toBe('column name cannot empty')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })
  describe('delete product', function () {
    it('Delete /products/:id', function (done) {
      response(app)
        .delete('/products/1')
        .set('token', tokenAdmin)
        .then(({ body, status }) => {
          expect(status).toBe(200)
          expect(typeof body).toBe('object')
          done()
        })
        .catch(err => {
          done(err)
        })
    })
  })


})



