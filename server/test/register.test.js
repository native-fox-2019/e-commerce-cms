const app = require('../app');
const request = require('supertest');
const { User } = require('../models');

beforeAll(async() => {
    jest.setTimeout(10000);
    await dbHandler.connect();
})

describe('Register for users', () => {
    describe('Success create user', () => {
        it('Should return 201 and obj (user)', async(done) => {
            let input = {
                email: 'test@test.com',
                password: 'test',
                role: 'Admin'
            }
            await request(app)
                .post('/users/register')
                .send(input)
                .then(result => {
                    const { body, status } = result;
                    expect(status).toBe(201);
                    expect(body).toHaveProperty('email', 'test@test.com');
                    expect(body).toHaveProperty('password', 'test');
                    expect(body).toHaveProperty('role', 'Admin');
                    done();
                }).catch(err => {
                    done(err);
                })
        })
    })
})