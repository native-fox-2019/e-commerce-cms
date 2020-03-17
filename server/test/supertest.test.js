const app = require('../app')
const supertest = require('supertest')

let token = ""

//REGISTER
describe('User Endpoints', () => {
  it('should create a new user', async() => {
    const res = await request(app)
      .post('/users/register')
      .send({
        username: 'marcel',
        email: 'marcelus02@gmail.com',
        password: '12345',
        admin: false,
      })
    expect(res.status).toEqual(201)
    expect(res.body).toHave("username")
    expect(res.body).toHave("email")
    expect(res.body).toHave("password")
    expect(res.body).toHaveProperty("admin")

  });
});