const app = require('../app');
const supertest = require('supertest');
const jwt = require('../helpers/jwt');
const model = require('../models');
const User = model.User;

beforeAll(async () => {
    await User.create({
        email: "rofandi@gmail.com",
        isAdmin: true,
        password: "123"
    });
});
afterAll(done => {
    User.destroy({ where: { }})
    .then(()=>done())
    .catch(err=>done(err));
});

describe('Login test for user', ()=>{
    describe('Login success and received token', () => {
        it('returns 200 and object (token)', (done) => {
            let input = {
                email: 'rofandi@gmail.com',
                password: '123'
            };
            supertest(app)
                .post('/users/login')
                .send(input)
                .then(res =>{
                    const status = res.status;
                    const body = res.body;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty("token");
                    done();
                })
                .catch(err => {
                    done(err);
                });
        });
    });
    describe('Login failed', () => {
        it('returns 400 and error message', (done) => {
            let input = {
                email: 'rofandi@gmail.com',
                password: '1234'
            };
            supertest(app)
                .post('/users/login')
                .send(input)
                .then(res => {
                    const body = res.body;
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('message','Wrong Password/Username');
                    done();
                })
                .catch(err => {
                    done(err);
                });      
        });
    });
});

describe('Register test for user', () => {
    describe('Register success and received token', () => {
        it('returns 201 and object (user)', (done) => {
            let input = {
                email: 'rofandi2@gmail.com',
                password: '123'
            };
            supertest(app)
            .post('/users/register')
            .send(input)
            .then(res => {
                const status = res.status;
                const body = res.body;
                expect(status).toBe(201);
                expect(body).toHaveProperty("token");
                done();
            })
            .catch(err=>{
                done(err);
            });
        });
    });
})

// describe('POST /user/login (correct password)', () => {
//     it('returns 200 and object (token)', done => {
//         supertest(app)
//             .post('/user/login')
//             .send({
//                 email: 'test@gmail.com',
//                 password: '123'
//             })
//             .expect(200)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 expect(res.status).toBe(200);
//                 expect(res.body).toHaveProperty("token");
//                 const decodedToken = jwt.verify(res.body.token);
//                 expect(decodedToken).toHaveProperty('id');
//                 expect(decodedToken).toHaveProperty('isAdmin');
//                 expect(decodedToken.isAdmin).toBe(false);
//                 return done();
//             });
//     });
// });

// describe('POST /user/login (wrong password)', () => {
//     it('returns 400', done => {
//         supertest(app)
//             .post('/user/login')
//             .send({
//                 email: 'test@gmail.com',
//                 password: '1234'
//             })
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 return done();
//             })
//     })
// });