const app = require('../app');
const request = require('supertest');
const faker = require('faker');
const {
    sequelize
} = require('../models');
const {
    queryInterface
} = sequelize;
require('dotenv').config();

// Setelah selesai semua
// afterAll((done) => {
//     queryInterface.bulkDelete('Users', {})
//         .then(() => {
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// })
let user_email = faker.internet.email();
let access_token;
test('Login Super User', done => {
    request(app)
        .post('/user/login')
        .send({
            email: 'rqz.agastya@gmail.com',
            password: process.env.SUPER_PASS
        })
        .then(result => {
            access_token = result.body.access_token;
            expect(result.status).toBe(200);
            done();
        })
        .catch(err => {
            done(err);
        });
});

// Test Register
describe('POST /user/registration -> Test Register', () => {
    it('Try to Regist Successfully:', done => {
        request(app)
            .post('/user/registration')
            .send({
                name: 'User TEST',
                email: user_email,
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(201);
                expect(body).toHaveProperty('access_token');
                expect(body).toHaveProperty(
                    'message',
                    'Create new User Successfully'
                );
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Try to Register With Empty Email', done => {
        request(app)
            .post('/user/registration')
            .send({
                name: 'User 1',
                email: '',
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message', [
                    'Email Column Cannot Empty'
                ]);
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Try to Register With Empty Email and Password length < 6', done => {
        request(app)
            .post('/user/registration')
            .send({
                name: 'User 2',
                email: '',
                password: 'qwer'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message');
                expect(body.message).toContain('Email Column Cannot Empty');
                expect(body.message).toContain(
                    'Password Length Minimum 6 Characters'
                );
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Try to Register with Registered Email', done => {
        request(app)
            .post('/user/registration')
            .send({
                name: 'User 2',
                email: user_email,
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty(
                    'message',
                    'Email Already Registered'
                );
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});

// Test Login
describe('POST /user/login -> Test Login', () => {
    it('Try to Login Successfully', done => {
        request(app)
            .post('/user/login')
            .send({
                email: user_email,
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(200);
                expect(body).toHaveProperty('access_token');
                expect(body).toHaveProperty('message', 'Login Successfully');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Try to Login Unregistered User', done => {
        request(app)
            .post('/user/login')
            .send({
                email: 'a' + user_email,
                password: 'qwerty'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(404);
                expect(body).toHaveProperty('status_code', 404);
                expect(body).toHaveProperty(
                    'message',
                    'You Are not Registered'
                );
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Try to Login With Wrong Password', done => {
        request(app)
            .post('/user/login')
            .send({
                email: user_email,
                password: 'qwerty123'
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message', 'Wrong Password');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});

let user_id
describe('GET /user/listAll -> Test get all users', () => {
    it('Try to get successfully', done => {
        request(app)
            .get('/user/listAll')
            .set({
                access_token
            })
            .then(result => {
                const {
                    body,
                    status
                } = result;
                user_id = body[body.length - 1].id
                expect(status).toBe(200);
                done();
            })
            .catch(err => {
                done(err);
            });
    })
});

describe('PATCH /user/addAdmin/:id -> Add new Member', () => {
    it('Try to add member successfully', (done) => {
        request(app).patch(`/user/addAdmin/${user_id}`).set({
                access_token
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(200)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Try to add member with wrong id', (done) => {
        request(app).patch(`/user/addAdmin/${user_id+1}`).set({
                access_token
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(404)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})

describe('PATCH /user/removeAdmin/:id', () => {
    it('Test to remove admin status successfully', (done) => {
        request(app).patch(`/user/removeAdmin/${user_id}`).set({
                access_token
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(200)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it('Test to remove admin status successfully', (done) => {
        request(app).patch(`/user/removeAdmin/${user_id+1}`).set({
                access_token
            })
            .then(result => {
                const {
                    body,
                    status
                } = result
                expect(status).toBe(404)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

})