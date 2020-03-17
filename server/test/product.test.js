/** @format */
require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const { User } = require('../models')
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const jwt = require('jsonwebtoken')

describe("Test for product", function() {
  describe("Success products", function() {
    it("Should return 200", function(done) {
      request(app)
        .post("/products")
        .send({
          name: "bakso",
          description: "bakso enak",
          category: "makanan",
          image_url: "jdfbjkdsnfjk",
          price: 2000,
          stock: 4
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(200);
          expect(body).toHaveProperty("name", "bakso");
          done();
        })
        .catch(err => {
          done(err);
        });
    })
  })
})