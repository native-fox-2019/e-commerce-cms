const app = require('../app')
const supertest = require('supertest')
let token = ""

describe('Admin endpoint', () => {
  // LOGIN ADMIN
  it('Should get token for admin', async () => {
    const res = await supertest(app)
      .post('/admins/login')
      .send({
        email: "marcel.admin@gmail.com",
        password: "12345"
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("token")
    token = res.body.token
  });
  it('Should fail to get token', async () => {
    const res = await supertest(app)
      .post('/admins/login')
      .send({
        email: "marcel.admin@gmail.com",
        password: "1234"
      })
    expect(res.status).toEqual(400)
  })
  // REGISTER ADMIN
  
  it('Should register new Admin', async () => {
    const res = await supertest(app)
      .post('/admins/register')
      .set('token', token)
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
      .set("token", token)
      .send({
        email: "marceleng@gmail.com",
        password: "1213",
      })
    expect(res.status).toEqual(400)
  })
});