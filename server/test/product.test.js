const app = require('../app');
const response = require('supertest');
const { Product, Sequelize } = require('../models');
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTg0NDM5NzI2fQ.wqCQussA3P1KbtxyX5Mx-_8nZhYJrL5jCEJAEE2rMQA';
let fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTg0NDM3Njc1fQ.cXTa-T-1vQxO3fMW45wqFbMx1eM-Y3kn7gOgALbMD_s';
const Op = Sequelize.Op;

beforeAll(async () => {
    await Product.create({
        id: 1000,
        name: 'Baju',
        image_url: 'aefniaef.img',
        price: 500000,
        stock: 10
    })
    await Product.create({
        id: 1001,
        name: 'Baju',
        image_url: 'aefniaef.img',
        price: 500000,
        stock: 10
    })
});
afterAll(done => {
    Product.destroy({ where: {} })
        .then(() => {
            done();
        }).catch(err => {
            done(err);
        })
});

describe('CRUD for products using admin account', () => {
    describe('Successfully doing CRUD', () => {
        describe('Add a product', () => {
            it('Should return 201 and obj (name, image_url, price, stock)', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'fabjefaefase.img',
                    price: 150000,
                    stock: 10
                }
                response(app)
                    .post('/product')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(201);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('image_url', input.image_url);
                        expect(body).toHaveProperty('price', input.price);
                        expect(body).toHaveProperty('stock', input.stock);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Read all products', () => {
            it('Should return 200 and array of obj', (done) => {
                response(app)
                    .get('/product')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body[0]).toHaveProperty('createdAt');
                        expect(body[0]).toHaveProperty('updatedAt');
                        expect(body[0]).toHaveProperty('name');
                        expect(body[0]).toHaveProperty('image_url');
                        expect(body[0]).toHaveProperty('price');
                        expect(body[0]).toHaveProperty('stock');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Update a product', () => {
            it('Should return 200 and obj', (done) => {
                let input = {
                    name: 'Baju edited',
                    image_url: 'fabjefaefase.img',
                    price: 150000,
                    stock: 19
                }
                response(app)
                    .put('/product/1000')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('image_url', input.image_url);
                        expect(body).toHaveProperty('price', input.price);
                        expect(body).toHaveProperty('stock', input.stock);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Delete a product', () => {
            it('Should return 200 and msg', (done) => {
                response(app)
                    .delete('/product/1000')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        expect(body).toHaveProperty('msg', 'Your data has been deleted');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
    describe('Fail to do CRUD in product', () => {
        describe('Fail to create Data', () => {
            it('Should return 400 and msg', (done) => {
                let input = {
                    name: '',
                    image_url: '',
                    price: -1,
                    stock: -2
                }
                let output = ['Name cannot be empty',
                    'Price must be greater than 0', 'Stock must be greater than 0'
                ];
                response(app)
                    .post('/product')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(400);
                        expect(body).toHaveProperty('msg');
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body.msg).toEqual(expect.arrayContaining(output));
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and msg', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'afia.img',
                    price: 1000,
                    stock: 52
                }
                response(app)
                    .post('/product')
                    .send(input)
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'afia.img',
                    price: 1000,
                    stock: 52
                }
                response(app)
                    .post('/product')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to read data', () => {
            it('Should return 403 and msg', (done) => {
                response(app)
                    .get('/product')
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'afia.img',
                    price: 1000,
                    stock: 52
                }
                response(app)
                    .post('/product')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to update Data', () => {
            it('Should return 400 and msg', (done) => {
                let input = {
                    name: '',
                    image_url: 'fabjefaefase.img',
                    price: -1,
                    stock: -20
                }
                let output = ['Name cannot be empty',
                    'Price must be greater than 0', 'Stock must be greater than 0'
                ];
                response(app)
                    .put('/product/1001')
                    .set('token', token)
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(400);
                        expect(body).toHaveProperty('msg');
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body.msg).toEqual(expect.arrayContaining(output));
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and msg', (done) => {
                let input = {
                    name: 'baju',
                    image_url: 'fabjefaefase.img',
                    price: 10000,
                    stock: 20
                }
                response(app)
                    .put('/product/1001')
                    .send(input)
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 404 and msg', (done) => {
                let input = {
                    name: 'baju',
                    image_url: 'fabjefaefase.img',
                    price: 10000,
                    stock: 20
                }
                response(app)
                    .put('/product/10010')
                    .send(input)
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('msg', 'Error Not Found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'afia.img',
                    price: 1000,
                    stock: 52
                }
                response(app)
                    .post('/product')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to delete Data', () => {
            it('Should return 404 and msg', (done) => {
                response(app)
                    .delete('/product/10010')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('msg', 'Error Not Found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 403 and msg', (done) => {
                response(app)
                    .delete('/product/1001')
                    .set('token', fakeToken)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Baju',
                    image_url: 'afia.img',
                    price: 1000,
                    stock: 52
                }
                response(app)
                    .post('/product')
                    .send(input)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('msg', 'You have to login first');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
});