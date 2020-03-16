const app = require('../app')
const request = require('supertest')
const { verifyToken } = require('../helpers/jwt')
const { comparer } = require('../helpers/bcrypt')

describe('Login', () => {
    describe('Sucessfully login', () => {
        it('Should return 200 and object (access_token)', async done => {
            try {
                const { body, status } = await request(app).post('/login').send({
                    email: 'bambang@gmail.com',
                    password: 'bambang'
                })
                expect(status).toBe(200)
                expect(body).toHaveProperty('access_token')
                let payloadEmail = verifyToken(body.access_token).email
                expect(payloadEmail).toBe('bambang@gmail.com')
            } catch (err) {
                done(err)
            }
        })
    })

    describe('Wrong email / password', () => {
        it('Should return 400 and object (status, message)', async done => {
            try {
                const { body, status } = await request(app).post('/login').send({
                    email: '',
                    password: ''
                })
            } catch (err) {
                
            }
        })
    })
})