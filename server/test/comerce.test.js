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

let obj = {
    name : "afif",
    email : "afif@email.com",
    password : "1234"
}


describe('register success', function(){
    it('should return status 201 and result', function(done){
        request(app)
        .post('/user/register')
        .send(obj)
        .then(response =>{
            const { body, status } = response;
            const { result } = body;
            expect(body).toHaveProperty('message','register success')
            done()
        })
    })
})