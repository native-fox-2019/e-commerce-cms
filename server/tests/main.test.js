const request = require('supertest')
const app = require('../app')

let token = null
let tokenBroken = 'Br0k3nT0k3n'
let tokenUser = null

// User
describe('Endpoints User', () => {
  it('astatus code 200 logged as Admin', async () => {
    const res = await request(app)
      .post('/user/loginAdmin')
      .send({
        email: 'admin@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
  it('astatus code 200 logged as User', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'user@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    tokenUser = res.body.token
  })
  it('astatus code 401 Unauthorize user to login as admin', async () => {
    const res = await request(app)
      .post('/user/loginAdmin')
      .send({
        email: 'user@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('astatus code 401 Unauthorize admin to login as user', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email: 'admin@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 email or password wrong', async () => {
    const res = await request(app)
      .post('/user/loginAdmin')
      .send({
        email: 'admin@email.com',
        password: '1234' // wrong
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 user not found', async () => {
    const res = await request(app)
      .post('/user/loginAdmin')
      .send({
        email: 'admin1@email.com', //email not found
        password: '1234'
      })
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
// CREATE USER ADMIN 
  it('status code 201 created user', async () => {
    const res = await request(app)
      .post('/user').set('token', token)
      .send({
        name: 'admin2',
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .post('/user').set('token', token)
      .send({
        name: '', //empty
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot be null ', async () => {
    const res = await request(app)
      .post('/user').set('token', token)
      .send({
        //null
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .post('/user') //empty
      .send({
        name: 'admin2',
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .post('/user').set('token', tokenBroken)
      .send({
        name: 'admin2',
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .post('/user').set('token', tokenUser)
      .send({
        name: 'admin2',
        email: 'admin2@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
// GET ALL USER
  it('status code 200 get all user', async () => {
    const res = await request(app)
      .get('/user').set('token', token)
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .get('/user')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
    .get('/user').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
    .get('/user').set('token', tokenUser)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
// FIND ONE USER
  it('status code 200 get one user', async () => {
    const res = await request(app)
      .get('/user/1').set('token', token)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .get('/user/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
    .get('/user/1').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
    .get('/user/1').set('token', tokenUser)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
    .get('/user/99').set('token', token)
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
// UPDATE USER
  it('status code 200 update user', async () => {
    const res = await request(app)
      .put('/user/2').set('token', token)
      .send({
        name: 'user',
        email: 'user@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .put('/user/2').set('token', token)
      .send({
        name: '', //empty
        email: 'admin3@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .put('/user/2') //empty
      .send({
        name: 'admin3',
        email: 'admin3@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .put('/user/2').set('token', tokenBroken)
      .send({
        name: 'admin3',
        email: 'admin3@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .put('/user/2').set('token', tokenUser)
      .send({
        name: 'admin3',
        email: 'admin3@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
      .put('/user/99').set('token', token)
      .send({
        name: 'admin3',
        email: 'admin3@email.com',
        password: '12345'
      })
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
// DELETE USER
  it('status code 200 get one user', async () => {
    const res = await request(app)
      .delete('/user/3').set('token', token)
    expect(res.status).toEqual(200)
    expect(typeof res.body).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .delete('/user/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
    .delete('/user/1').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
    .delete('/user/1').set('token', tokenUser)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
    .delete('/user/99').set('token', token)
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
})
// Category
describe('Endpoints categories', () => {
  // CREATE Category
  it('status code 201 created categories', async () => {
    const res = await request(app)
      .post('/categories').set('token', token)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('name')
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .post('/categories').set('token', token)
      .send({
        name: '', //empty
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot be null ', async () => {
    const res = await request(app)
      .post('/categories').set('token', token)
      .send({
        //null
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .post('/categories') //empty
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .post('/categories').set('token', tokenBroken)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .post('/categories').set('token', tokenUser)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // Get all category
  it('status code 200 get all category', async () => {
    const res = await request(app)
      .get('/categories')
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  // Get one category
  it('status code 200 get one category', async () => {
    const res = await request(app)
      .get('/categories/1')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })
  // UPDATE category
  it('status code 200 update category', async () => {
    const res = await request(app)
      .put('/categories/1').set('token', token)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .put('/categories/1').set('token', token)
      .send({
        name: '', //empty
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .put('/categories/1') //empty
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .put('/categories/1').set('token', tokenBroken)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .put('/categories/1').set('token', tokenUser)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
      .put('/categories/99').set('token', token)
      .send({
        name: 'category 1',
      })
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // delete category
  it('status code 200 delete category', async () => {
    const res = await request(app)
      .delete('/categories/2').set('token', token)
    expect(res.status).toEqual(200)
    expect(typeof res.body).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .delete('/categories/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
    .delete('/categories/1').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
    .delete('/categories/1').set('token', tokenUser)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
    .delete('/categories/99').set('token', token)
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
})
// product
describe('Endpoints products', () => {
  // CREATE product
  it('status code 201 created products', async () => {
    const res = await request(app)
      .post('/products').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('name')
  })
  it('status code 400 value must number', async () => {
    const res = await request(app)
      .post('/products').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 'string', //must number
        stock: 'string', // must number
        description: 'string',
        CategoryId: 'string' //must number
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 value higer than 0', async () => {
    const res = await request(app)
      .post('/products').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: -1, //must number
        stock: 1, // must number
        description: 'string',
        CategoryId: 1 //must number
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .post('/products').set('token', token)
      .send({
        name: '', //empty
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot be null ', async () => {
    const res = await request(app)
      .post('/products').set('token', token)
      .send({
        //null
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .post('/products') //empty
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .post('/products').set('token', tokenBroken)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .post('/products').set('token', tokenUser)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // Get all product
  it('status code 200 get all product', async () => {
    const res = await request(app)
      .get('/products')
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  // Get one product
  it('status code 200 get one product', async () => {
    const res = await request(app)
      .get('/products/1')
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
  })
  // UPDATE product
  it('status code 200 update product', async () => {
    const res = await request(app)
      .put('/products/1').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('image_url')
    expect(res.body).toHaveProperty('price')
    expect(res.body).toHaveProperty('stock')
    expect(res.body).toHaveProperty('description')
    expect(res.body).toHaveProperty('CategoryId')
  })
    it('status code 400 value must number', async () => {
    const res = await request(app)
      .put('/products/1').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 'string', //must number
        stock: 'string', // must number
        description: 'string',
        CategoryId: 3 
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
    it('status code 400 value higer than 0', async () => {
    const res = await request(app)
      .put('/products/1').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: -1, //must higer
        stock: -1, // must higer
        description: 'string',
        CategoryId: 3
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .put('/products/1').set('token', token)
      .send({
        name: '', //empty
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .put('/products/1') //empty
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .put('/products/1').set('token', tokenBroken)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .put('/products/1').set('token', tokenUser)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
      .put('/products/99').set('token', token)
      .send({
        name: 'product 1',
        image_url: 'string',
        price: 1,
        stock: 1,
        description: 'string',
        CategoryId: 1
      })
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // delete product
  it('status code 200 get one product', async () => {
    const res = await request(app)
      .delete('/products/2').set('token', token)
    expect(res.status).toEqual(200)
    expect(typeof res.body).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .delete('/products/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .delete('/products/1').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .delete('/products/1').set('token', tokenUser)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
      .delete('/products/99').set('token', token)
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
})
// cart
describe('Endpoints carts', () => {
  // CREATE
  it('status code 201 created carts', async () => {
    const res = await request(app)
      .post('/carts').set('token', tokenUser)
      .send({
        ProductId: 1,
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('ProductId')
    expect(res.body).toHaveProperty('UserId')
    expect(res.body).toHaveProperty('quantity')
  })
  it('status code 400 value must number', async () => {
    const res = await request(app)
      .post('/carts').set('token', tokenUser)
      .send({
        ProductId: 'string',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .post('/carts').set('token', tokenUser)
      .send({
        ProductId: '',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot be null ', async () => {
    const res = await request(app)
      .post('/carts').set('token', tokenUser)
      .send({
        //null
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .post('/carts') //empty
      .send({
        ProductId: 1,
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .post('/carts').set('token', tokenBroken)
      .send({
        ProductId: 1,
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .post('/carts').set('token', token)
      .send({
        ProductId: 1,
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // Get all cart
  it('status code 200 get all cart', async () => {
    const res = await request(app)
      .get('/carts').set('token', tokenUser)
    expect(res.status).toEqual(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .get('/carts').set('token', token)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .get('/carts')
    expect(res.status).toEqual(400)
    expect(typeof res.body).toBe('object')
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')

  })
  // Get one cart
  it('status code 200 get one cart', async () => {
    const res = await request(app)
      .get('/carts/1').set('token', tokenUser)
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('ProductId')
    expect(res.body).toHaveProperty('UserId')
    expect(res.body).toHaveProperty('quantity')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .get('/carts/1').set('token', token)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .get('/carts/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body).toBe('object')
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')

  })
  // UPDATE
    it('status code 200 updated cart', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', tokenUser)
      .send({
        quantity: 1,
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('ProductId')
    expect(res.body).toHaveProperty('UserId')
    expect(res.body).toHaveProperty('quantity')
  })
  it('status code 400 value must number', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', tokenUser)
      .send({
        quantity: 'string',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot Empty ', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', tokenUser)
      .send({
        quantity: '',
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 cannot be null ', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', tokenUser)
      .send({
        quantity: null
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(Array.isArray(res.body.message)).toBe(true)
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .patch('/carts/1') //empty
      .send({
        quantity: 1,
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', tokenBroken)
      .send({
        quantity: 1,
      })
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
      .patch('/carts/1').set('token', token)
      .send({
        quantity: 1,
      })
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  // Delete
  it('status code 200 delete cart', async () => {
    const res = await request(app)
      .delete('/carts/2').set('token', tokenUser)
    expect(res.status).toEqual(200)
    expect(typeof res.body).toBe('string')
  })
  it('status code 400 token require', async () => {
    const res = await request(app)
      .delete('/carts/1')
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 400 token invalid', async () => {
    const res = await request(app)
    .delete('/carts/1').set('token', tokenBroken)
    expect(res.status).toEqual(400)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 401 unauthorize', async () => {
    const res = await request(app)
    .delete('/carts/1').set('token', token)
    expect(res.status).toEqual(401)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
  it('status code 404 notFound', async () => {
    const res = await request(app)
    .delete('/carts/99').set('token', tokenUser)
    expect(res.status).toEqual(404)
    expect(typeof res.body.status).toBe('number')
    expect(typeof res.body.message).toBe('string')
  })
})