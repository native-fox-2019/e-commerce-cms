const request = require('supertest')
const app = require('../app.js')
const { sequelize,Admin,Product } = require('../models')
const { queryInterface } = sequelize

afterAll(done=>{
    queryInterface
    .bulkDelete('Admin','Product',{})
    .then(()=>done())
    .catch(err=> done(err))
});