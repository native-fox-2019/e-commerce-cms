const app = require('../app');
const request = require('supertest');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {User} = require('../models');
const {sequelize} = require('../models');
const {queryInterface} = sequelize;

// afterAll((done) => {
//     queryInterface.bulkDelete('Products')
//         .then(result => {
//             return queryInterface.bulkDelete('Users')
//         })
//         .then(result => {
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
// })

// Global Variable
let token;
let id;

test('Login Super User', done => {
    request(app)
        .post('/user/login')
        .send({
            email: 'rqz.agastya@gmail.com',
            password: process.env.SUPER_PASS
        })
        .then(result => {
            const {body, status} = result;
            token = body.access_token;
            expect(body).toHaveProperty('access_token');
            done();
        })
        .catch(err => {
            done(err);
        });
});

describe('POST /product -> Test POST Route Product', () => {
    it('Test Create Successfully', done => {
        request(app)
            .post('/product')
            .send({
                name: 'laptop asus X',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: 7000000,
                stock: 20
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(201);
                expect(body).toHaveProperty('data');
                expect(body).toHaveProperty(
                    'message',
                    'Create Task Successfully'
                );
                id = body.data.id;
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Name Empty', done => {
        request(app)
            .post('/product')
            .send({
                name: '',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: 7000000,
                stock: 20
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message');
                expect(body.message).toContain('Name cannot empty');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Name Empty, Price Negative, Stock Negative', done => {
        request(app)
            .post('/product')
            .send({
                name: '',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: -7000000,
                stock: -20
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message');
                expect(body.message).toContain('Name cannot empty');
                expect(body.message).toContain('Price cannot negative');
                expect(body.message).toContain('Stock cannot negative');
                done();
            })
            .catch(err => {
                done();
            });
    });
});

describe('GET /product -> Test GET Route Product', () => {
    it('Test Read All Successfully', done => {
        request(app)
            .get('/product')
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(200);
                expect(body).toHaveProperty('message', 'Read Successfully');
                expect(body).toHaveProperty('data');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Read By Id Successfully', done => {
        request(app)
            .get(`/product/${id}`)
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(200);
                expect(body).toHaveProperty('message', 'Read Successfully');
                expect(body).toHaveProperty('data');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Read By Id, Id Not Found', done => {
        request(app)
            .get(`/product/${id + 1}`)
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(404);
                expect(body).toHaveProperty('status_code', 404);
                expect(body).toHaveProperty('message', 'Data Not Found');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});

describe('PUT /product -> Test PUT Route Product', () => {
    it('Test Update Successfully', done => {
        request(app)
            .put(`/product/${id}`)
            .send({
                name: 'laptop Asus Y',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: 7200000,
                stock: 10
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(200);
                expect(body).toHaveProperty('message', 'Update Successfully');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Update with Id Not Found', done => {
        request(app)
            .put(`/product/${id + 1}`)
            .send({
                name: 'laptop Asus Y',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: 7200000,
                stock: 10
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(404);
                expect(body).toHaveProperty('status_code', 404);
                expect(body).toHaveProperty('message', 'Data Not Found');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Update with Name Empty', done => {
        request(app)
            .put(`/product/${id}`)
            .send({
                name: '',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: 7200000,
                stock: 10
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message');
                expect(body.message).toContain('Name cannot empty');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Update with Name Empty, Price Negative, Stock Negative', done => {
        request(app)
            .put(`/product/${id}`)
            .send({
                name: '',
                image_url:
                    'https://d2pa5gi5n2e1an.cloudfront.net/webp/global/images/product/laptops/ASUS_A455LN_WX005D/ASUS_A455LN_WX005D_L_1.jpg',
                price: -7200000,
                stock: -10
            })
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(400);
                expect(body).toHaveProperty('status_code', 400);
                expect(body).toHaveProperty('message');
                expect(body.message).toContain('Name cannot empty');
                expect(body.message).toContain('Price cannot negative');
                expect(body.message).toContain('Stock cannot negative');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});

describe('DELETE /product -> Test DELETE Route Product', () => {
    it('Test Delete Successfully', done => {
        request(app)
            .delete(`/product/${id}`)
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(200);
                expect(body).toHaveProperty('message', 'Delete Successfully');
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    it('Test Delete with Id Not Found', done => {
        request(app)
            .delete(`/product/${id}`)
            .set('access_token', token)
            .then(result => {
                const {body, status} = result;
                expect(status).toBe(404);
                expect(body).toHaveProperty('status_code', 404);
                expect(body).toHaveProperty('message', 'Data Not Found');
                done();
            })
            .catch(err => {
                done(err);
            });
    });
});
