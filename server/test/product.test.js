const app = require('../app');
const response = require('supertest');
const { Product, Sequelize } = require('../models');
const { generateToken } = require('../helpers/jwt');
let token = null;
let fakeToken = null;
const Op = Sequelize.Op;

beforeAll(async () => {
    let obj = {
        id: 1
    }
    token = generateToken(obj);
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
                        expect(status).toBe(200); //createdAt dan updatedAt nya?
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
                    .delete('/product/1000') //ganti id
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
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
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
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
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
                    .put('/product/1002')
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
        });
        describe('Fail to delete Data', () => {
            it('Should return 404 and msg', (done) => {
                response(app)
                    .delete('/product/1002') //ganti id
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
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('msg', 'You are forbidden to do that');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
});