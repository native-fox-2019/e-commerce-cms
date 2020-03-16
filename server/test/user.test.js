const request = require('supertest')
const app = require('../app')

describe('Test for users', function() {
    describe('post to /register', function() {
        it('Should return 201', function(done) {
          request(app)
            .post('/users/register')
            .send({
                name: 'john',
                email: 'test@email.com',
                password : '1234',
                role: 'Admin'
            })
            // .set('Accept', 'application/json')
            .expect(function(res) {
                res.body.name = 'john';
                // res.body.name = res.body.name.toLowerCase();
              })
            .expect(201)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            });
        });
      });
})
