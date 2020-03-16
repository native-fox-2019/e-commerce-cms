const request = require('supertest')
const app = require('../app')

describe('user register', () => {
    describe('success register', () => {
        it('response with status 201 with access_token included', (done) => {
            request(app)
                .post('/user/register')
                .send({
                    name: 'ihiw',
                    email: '123@123.com',
                    password: '123'
                })
                .then(data => {
                    const { body, status } = data
                    expect(status).toBe(201)
                    expect(body).toHaveProperty('access_token')
                    done()
                })
                .catch(err =>{
                    done(err)
                })
        })
    })
    describe('failed register - empty form', ()=>{
        it('responds with array of message', (done)=>{
          request(app)
          .post('/user/register')
          .send({
              name: '',
              email: '',
              password: ''
          })
            .then(data => {
                console.log('====================',body)
                const { body, status } = data
            expect(status).toBe(400)
            expect(body).toHaveProperty('msg')
            done()
            })
            .catch(err =>{
                console.log('==============',err)
                done(err)
            })
        })
    })
    // describe('failed register - already used email', ()=>{
    //     it('responds with message', (done)=>{
    //       request(app)
    //       .post('/user/register')
    //       .send({
    //           name: 'erry',
    //           email: '123@123.com',
    //           password: '123'
    //       })
    //       .then(data => {
    //       const { body, status } = data
    //       expect(status).toBe(400)
    //       expect(body).toHaveProperty('msg','email already used')
    //       done()
    //       })
    //       .catch(err =>{
    //         done(err)
    //       })
    //     })
    // })
})

// describe('user login', () => {

// })
// describe('product add', () => {

// })