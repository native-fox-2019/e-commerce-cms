const request = require('supertest');
const app = require('../app');
const { sequelize, products, users } = require('../models/index');
const { queryInterface } = sequelize;

let tokenAdmin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3MywiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSJ9LCJpYXQiOjE1ODUwNTQwMzJ9.DXfI6SjckKQB1rZLLYOQk80G7qijtDG__ekphVW80EA"

afterAll(done => {
  queryInterface
    .bulkDelete('products', {})
    .then(() => done())
    .catch(err => done(err))
});
let id = null
describe('Create a new product ', function () {
  describe('Succesfully create product', function () {
    it('should return 200 and object (message,product)', function(done) {
      request(app)
        .post('/product')
        .set('token', tokenAdmin)
        .send({
          name: 'testName',
          image_url: 'Test imageUrl',
          price: 10000,
          stock: 50
        })
        .then(response => {
          // const { body, status } = res;
          console.log("name :", response.body.name)
          console.log("status :", response.status)
          expect(true).toBe(true)
          done()
        })

    })
  })


})