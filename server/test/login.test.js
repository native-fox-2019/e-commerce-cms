const app = require('../app');
const response = require('supertest');
const { generateToken } = require('../helpers/jwt');
let token = null;

beforeAll(() => {
    let obj = {
        id: 1,
        role: 'Admin'
    }
    token = generateToken(obj);
});

describe('Login test for User', () => {
    describe('Success to login and received token', () => {
        it('Should return 200 and obj (token)', (done) => {
            let input = {
                email: 'admin@admin.com',
                password: 'admin'
            }
            response(app)
                .post('/users/login')
                .send(input)
                .then(response => {
                    let { body, status } = response;
                    expect(status).toBe(200);
                    expect(body).toHaveProperty('token');
                    expect(body.token).toBe(token);
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    });
    describe('Fail to login', () => {
        it('Should return 400 and msg', (done) => {
            let input = {
                email: 'test@test.com',
                password: 'test'
            }
            response(app)
                .post('/users/login')
                .send(input)
                .then(response => {
                    let { body, status } = response;
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('msg', 'Wrong email/password');
                    done();
                }).catch(err => {
                    done(err);
                });
        })
    })
})