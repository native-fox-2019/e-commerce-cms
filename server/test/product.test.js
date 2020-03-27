const app = require('../app');
const supertest = require('supertest');
const models = require('../models');
const Product = models.Product;
const User = models.User;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZmFuZGlAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTg0Nzk5Nzk0fQ.NxhfeAGMguq75oei-wcjxb-2blp7YtW7wY9I4RcTVGo';
const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvZmFuZGkyQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1ODQ3OTk3OTR9.jpezlNXLdB45cxkVU6zSMckD9OU15XHvUC4ugv3XYSM';

beforeAll(async () => {
    await Product.create({
        id: 1,
        name: 'Buku',
        category: 'books',
        image_url: 'book.jpg',
        price: 10000,
        stock: 5
    })
});
afterAll(async done => {
    try {
        await Product.destroy({ where: {} });
        done();
    } catch (err) {
        done(err);
    }
});

describe('CRUD for products using admin account', () => {
    describe('Successfully doing CRUD', () => {
        describe('Add a product', () => {
            it('Should return 201 and obj (name, category, image_url, price, stock)', (done) => {
                const input = {
                    name: 'Buku',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: "10000",
                    stock: 5
                }
                supertest(app)
                    .post('/products')
                    .set('Authorization', token)
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(201);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('category', input.category);
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
                supertest(app)
                    .get('/products')
                    .set('Authorization', token)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(200);
                        expect(Array.isArray(['body'])).toBe(true);
                        expect(body[0]).toHaveProperty('createdAt');
                        expect(body[0]).toHaveProperty('updatedAt');
                        expect(body[0]).toHaveProperty('name');
                        expect(body[0]).toHaveProperty('category');
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
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: "20000",
                    stock: "15"
                }
                supertest(app)
                    .put('/products/1')
                    .set('Authorization', token)
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(200);
                        expect(body).toHaveProperty('name', input.name);
                        expect(body).toHaveProperty('category', input.category);
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
                supertest(app)
                    .delete('/products/1')
                    .set('Authorization', token)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(202);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
    describe('Fail to do CRUD in product', () => {
        describe('Fail to create Data', () => {
            it('Should return 403 and msg', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                            }
                supertest(app)
                    .post('/products')
                    .send(input)
                    .set('Authorization', fakeToken)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('message', 'Forbidden');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                }
                supertest(app)
                    .post('/products')
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('message', 'Unauthorized');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to read data', () => {
            it('Should return 403 and msg', (done) => {
                supertest(app)
                    .get('/products')
                    .set('Authorization', fakeToken)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('message', 'Forbidden');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and msg', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                            }
                supertest(app)
                    .post('/products')
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('message', 'Unauthorized');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to update Data', () => {
            it('Should return 403 and msg', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                }
                supertest(app)
                    .put('/products/1')
                    .send(input)
                    .set('Authorization', fakeToken)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(403);
                        expect(body).toHaveProperty('message', 'Forbidden');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 404 and msg', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                }
                supertest(app)
                    .put('/products/999')
                    .send(input)
                    .set('Authorization', token)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('message', 'Product not found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and message', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                }
                supertest(app)
                    .post('/products')
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('message', 'Unauthorized');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        describe('Fail to delete Data', () => {
            it('Should return 404 and message', (done) => {
                supertest(app)
                    .delete('/products/999')
                    .set('Authorization', token)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(404);
                        expect(body).toHaveProperty('message', 'Product not found');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and message', (done) => {
                supertest(app)
                    .delete('/products/1')
                    .set('token', fakeToken)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('message', 'Unauthorized');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
            it('Should return 401 and message', (done) => {
                let input = {
                    name: 'Buku Tulis',
                    category: 'books',
                    image_url: 'book.jpg',
                    price: 20000,
                    stock: 15
                }
                supertest(app)
                    .post('/products')
                    .send(input)
                    .then(res => {
                        const body = res.body;
                        const status = res.status;
                        expect(status).toBe(401);
                        expect(body).toHaveProperty('message', 'Unauthorized');
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
    });
}); 