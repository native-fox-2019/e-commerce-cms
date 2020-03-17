const app = require('../app')
const supertest = require('supertest')

let token = ""

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
    token = res.body.token
    console.log(token);

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
