const app = require('../app')
const supertest = require('supertest')
let tokenAdmin = ""
let tokenUser = ""

//REGISTER USER
describe('User Endpoints', () => {
  it('should create a new user', async () => {
    const res = await supertest(app)
      .post('/users/register')
      .send({
        username: 'marcel',
        email: 'marcelus02@gmail.com',
        password: '12345',
        // admin: false,
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty("username")
    expect(res.body).toHaveProperty("email")
    expect(res.body).toHaveProperty("password")
    // expect(res.body).toHaveProperty("admin")
  });

  it('should fail to create new user', async () => {
    const res = await supertest(app)
      .post('/users/register')
      .send({
        username: '',
        email: 'marcelus02@gmail.com',
        password: '12345',
        admin: false,
      })
    expect(res.status).toEqual(400)
  });

  // LOGIN USER
  it('User Login and should get token', async () => {
    const res = await supertest(app)
      .post('/users/login')
      .send({
        email: 'marcelus02@gmail.com',
        password: '12345',
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("token")
    tokenUser = res.body.token
  });

  it('Should fail to login', async () => {
    const res = await supertest(app)
      .post('/users/login')
      .send({
        email: 'marcelus02@gmail.com',
        password: '12'
      })
    expect(res.status).toEqual(400)
    // done()

  })

});

// describe('User Login', () => {
//   it('should re-assign tokenUser', async () => {
//     const res = await supertest(app)
//       .post('/users/login')
//       .send({
//         email: 'marcel.biasa@gmail.com',
//         password: "12345",
//       })
//     expect(res.status).toEqual(200)
//     tokenUser = res.body.token
//   });
// })


describe('Admin endpoint', () => {
  // LOGIN ADMIN
  it('Should get tokenAdmin for admin', async () => {
    const res = await supertest(app)
      .post('/admins/login')
      .send({
        email: "marcel.admin@gmail.com",
        password: "12345"
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("token")
    tokenAdmin = res.body.token
  });
  it('Should fail to get token status 400', async () => {
    const res = await supertest(app)
      .post('/admins/login')
      .send({
        email: "marcel.admin@gmail.com",
        password: "1234"
      })
    expect(res.status).toEqual(400)
  })

  it('should unauthorized status 401', async () => {
    const res = await supertest(app)
      .post('/admins/login')
      .send({
        email: "marcel.biasa@gmail.com",
        password: "12345",
      })
    expect(res.status).toEqual(401)
  });

  // REGISTER ADMIN

  it('Should register new Admin', async () => {
    const res = await supertest(app)
      .post('/admins/register')
      .set('token', tokenAdmin)
      .send({
        username: 'marchie',
        password: "13210",
        email: 'marchie1@gmail.com'
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty("username")
    expect(res.body).toHaveProperty("password")
    expect(res.body).toHaveProperty("email")
  })

  it('should cannot register the new admin', async () => {
    const res = await supertest(app)
      .post('/admins/register')
      .set("token", tokenAdmin)
      .send({
        email: "marceleng@gmail.com",
        password: "1213",
      })
    expect(res.status).toEqual(400)
  })

});

// CRUD TESTING

describe('CRUD endpoint', () => {
  // READ
  it('should Read Product', async () => {
    const res = await supertest(app)
      .get('/products')
    expect(res.status).toEqual(200)
  });
  // CREATE
  it('should Create Product', async () => {
    const res = await supertest(app)
      .post('/products')
      .set('token', tokenAdmin)
      .send({
        name: 'Kopi sidingkalang',
        stock: 10,
        price: 20000,
        urlImage: 'https://blablabla.com',
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty("name")
    expect(res.body).toHaveProperty("stock")
    expect(res.body).toHaveProperty("price")
    expect(res.body).toHaveProperty("urlImage")
  });
  it('should cannot Create Product status 400', async () => {
    const res = await supertest(app)
      .post('/products')
      .set('token', tokenAdmin)
      .send({
        name: '',
        stock: 10,
        price: 20000,
        urlImage: '',
      })
    expect(res.status).toEqual(400)
  });

  it('should cannot Create Product UN-AUTHORIZED status 401', async () => {
    const res = await supertest(app)
      .post('/products')
      .set('token', tokenUser)
      .send({
        name: '',
        stock: 10,
        price: 20000,
        urlImage: '',
      })
    expect(res.status).toEqual(401)
  });
  it('should cannot Create Product status 400', async () => {
    const res = await supertest(app)
      .post('/products')
      .set('token', tokenAdmin)
      .send({
        name: 'kopi aja',
        stock: 10,
        price: 20000,
      })
    expect(res.status).toEqual(400)
  });

  //  DELETE
  it('Should Delete Product status 200', async () => {
    const res = await supertest(app)
      .delete('/products/1')
      .set('token', tokenAdmin)
    expect(res.status).toEqual(200)
  });
  it('Should not Delete Product UN-AUTHORIZED status 401', async () => {
    const res = await supertest(app)
      .delete('/products/2')
      .set('token', tokenUser)
    expect(res.status).toEqual(401)
  });

  it('Should not Delete Product NO PRODUCT ID status 404', async () => {
    const res = await supertest(app)
      .delete('/products/')
      .set('token', tokenAdmin)
    expect(res.status).toEqual(404)
  });
  // UPDATE
  it('Should Update the product', async () => {
    const res = await supertest(app)
      .patch('/products/1')
      .set('token', tokenAdmin)
      .send({
        name: 'kopi-kopian',
        stock: 19,
        urlImage: "https://localhost:siapa",
        price: 19000
      })
    expect(res.status).toEqual(200)
  });
  it('Should cannot Update because of Un-Authorized status 401', async () => {
    const res = await supertest(app)
      .patch('/products/1')
      .set('token', tokenUser)
      .send({
        name: 'kopi-kopian',
        stock: 19,
        urlImage: "https://localhost:siapa",
        price: 19000
      })
    expect(res.status).toEqual(401)
  });

  it('Should Cannot update because of the data is not fullfill yet status 400', async () => {
    const res = await supertest(app)
      .patch('/products/1')
      .set('token', tokenAdmin)
      .send({
        name: '',
        stock: 19,
        urlImage: '',
        price: 10000
      })
    expect(res.status).toEqual(400)
  });

  it('Should cannot update because of Data not Found status 404', async () => {
    const res = await supertest(app)
      .patch('/products/')
      .set("token", tokenAdmin)
      .send({
        name: 'kopi aja',
        stock: 21,
        urlImage: 'https://apainihoy.com',
        price: 30000
      })
    expect(res.status).toEqual(404)
  });
})