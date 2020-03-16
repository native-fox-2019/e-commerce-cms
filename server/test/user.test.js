const request = require('supertest');
const app = require('../app.js');

describe('User routes', function(){
        describe('POST /users/register', function() {
            it('should create a new user', function(done){
            request(app)
                .post('/users/register')
                .send({email: 'test@mail.com', password: '123', username: 'test'})
                .then(data => {
                    expect(data.status).toEqual(201)
                    done()
                })
                .catch(err=>{
                    done(err)
                })
        });
    });
})
