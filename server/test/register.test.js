const app = require('../app');
const request = require('supertest');
const { User, sequelize } = require('../models');
const { queryInterface } = sequelize;

afterAll(done => {
    queryInterface
        .bulkDelete('Users', {})
        .then(() => done())
        .catch(err => done(err));
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
                });
        });
    })
    describe('Failed to create User', () => {
        it('Should return 400 and obj (status, msg)', async(done) => {
            let input = {
                email: '',
                password: '',
                role: ''
            }
            let output = ['Email cannot be empty',
                'Password cannot be empty', 'Role must be User or Admin'
            ];
            await request(app)
                .post('/users/register')
                .send(input)
                .then(result => {
                    const { body, status } = result;
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('msg');
                    expect(body.msg).toEqual(expect.arrayContaining(output));
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    })
    describe('Fail to register', () => {
        it('Should return 400 and obj (status, obj)', async(done) => {
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
                    expect(status).toBe(400);
                    expect(body).toHaveProperty('status');
                    expect(body.status).toBe(400);
                    expect(body).toHaveProperty('msg', 'Email has already been registered');
                    done();
                }).catch(err => {
                    done(err);
                });
        });
    })
})