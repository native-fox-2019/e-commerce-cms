require('dotenv').config()
const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models');
const { queryInterface } = sequelize;
const { sign } = require('../helpers/jwt')
const {hashPass} = require('../helpers/bcrypt')
let access_token_user = ''
let access_token_admin = ''

beforeAll((done) => {
    let obj = [
        {
            name: 'admin',
            email: 'admin@admin.com',
            password: hashPass('123'),
            role: 'Admin'
        },
        {
            name: '123',
            email: '123@123.com',
            password: hashPass('123'),
            role: 'User'
        }
    ]
    User.bulkCreate(obj)
        .then(data => {
            console.log(data)
            let { id, role, name } = data[0]
            access_token_admin = sign({ id, role, name }, process.env.JWT_SECRET)
            id = data[1].id
            role = data[1].role
            name = data[1].name
            access_token_user = sign({ id, role, name }, process.env.JWT_SECRET)
            done()
        })
        .catch(err => done(err))
})

afterAll(done => {
    queryInterface
        .bulkDelete('Users', {})
        .then(() =>queryInterface
        .bulkDelete('Products', {}))
        .then(()=> done())
        .catch(err => done(err));
})

describe('Admin Only', () => {
    describe('add products', () => {
        it('respond with details of products', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_admin)
                .send({
                    name: 'kembang desa',
                    price: 300000,
                    stocks: 3,
                    imageURL: 'http://xhamster.com',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('name')
                    expect(body).toHaveProperty('price')
                    expect(body).toHaveProperty('stocks')
                    expect(body).toHaveProperty('imageURL')
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
    describe('fail adds products because empty form', () => {
        it('respond with array of message', (done) => {
            request(app)
                .post('/admin/products')
                .set('access_token', access_token_admin)
                .send({
                    name: '',
                    price: '',
                    stocks: '',
                    imageURL: '',
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(400)
                    done()
                    // expect(body).toHaveProperty('msg')
                    // expect(body).toHaveProperty('price')
                    // expect(body).toHaveProperty('stocks')
                    // expect(body).toHaveProperty('imageURL')
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})