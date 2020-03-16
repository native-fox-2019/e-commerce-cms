const app = require('../app');
const response = require('supertest');
const { Product } = require('../models');
const { generateToken } = require('../helpers/jwt');
let token = null;

beforeAll(() => {
    let obj = {
        id: 1,
        role: 'Admin'
    }
    token = generateToken(obj);
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
        })
        describe('Read all products', () => {
            it('Should return 200 and array of obj', (done) => {
                let output = [{
                    name: 'Baju',
                    image_url: 'fabjefaefase.img',
                    price: 150000,
                    stock: 10
                }]
                response(app)
                    .get('/product')
                    .set('token', token)
                    .then(response => {
                        const { body, status } = response;
                        expect(status).toBe(200);
                        done();
                    }).catch(err => {
                        done(err);
                    });
            });
        });
        // describe('Update a product', () => {
        //     it('Should return 200 and obj', (done) => {
        //         let input = {
        //             name: 'Baju edited',
        //             image_url: 'fabjefaefase.img',
        //             price: 150000,
        //             stock: 19
        //         }
        //         response(app)
        //             .put('/product')
        //             .set('token', token)
        //             .send(input)
        //             .then(response => {
        //                 const { body, status } = response;
        //                 expect(status).toBe(200);
        //                 expect(body).toHaveProperty('name', input.name);
        //                 expect(body).toHaveProperty('image_url', input.image_url);
        //                 expect(body).toHaveProperty('price', input.price);
        //                 expect(body).toHaveProperty('stock', input.stock);
        //                 done();
        //             }).catch(err => {
        //                 done(err);
        //             });
        //     });
        // });
        // describe('Delete a product', () => {

        // })
    })
})