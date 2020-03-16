const request = require('supertest')
const app = require('../app')

let token = null

// REGISTER
describe('User Endpoints', () => {
  it('should create a new User', async () => {
    const res = await request(app)
      .post('/user/register')
      .send({
        name:'Arif',
        username: 'arif05rachman',
        email:'arif05rachman@gmail.com',
        password: '12345'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
  // LOGIN
  it('should login a User', async () => {
    const res = await request(app)
      .post('/user/login')
      .send({
        email:'arif05rachman@gmail.com',
        password: '12345'
      })
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty('token')
    token = res.body.token
  })
})