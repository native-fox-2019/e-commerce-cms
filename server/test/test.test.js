const request = require(`supertest`)
const app = require(`../index`)
const model = require(`../models`)

afterAll((done) => {
    model.User.destroy({ where: {} })
    done()
})


describe(`Admin User Test`, () => {
    describe(`Admin register`, () => {
        test(`should return status 201 and token`, (done) => {
            request(app)
                .post(`/admins/register`)
                .send({
                    email: `test@test.com`,
                    password: `test`
                })
                .expect(201)
                .then(data => {
                    expect(data.body.token).toBe(data.body.token)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        test(`should return 400 and message`, (done) => {
            request(app)
                .post(`/admins/register`)
                .send({
                    email: ``,
                    password: ``
                })
                .expect(400)
                .then(data => {
                    expect(data.body.status_code).toBe(400)
                    expect(data.body.status_message).toBe(data.body.status_message)
                    console.log(data.body.status_message)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })

    describe(`Admin Login`, () => {
        test(`should return status 200 and token`, (done) => {
            request(app)
                .post(`/admins/login`)
                .send({
                    email: `test@test.com`,
                    password: `test`
                })
                .expect(200)
                .then(data => {
                    expect(data.body.token).toBe(data.body.token)
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
    })
})

describe(`admin CRUD test`, () => {
    it(`Admin create Produce should return array of data`, (done) => {
        request(app)
            .get(`/products`)
            .expect(200)
            .then(respond => {
                expect(respond.body.name).toBe(`apa`)
                done()
            })
            .catch(err => {
                done(err)
            })
    })
})