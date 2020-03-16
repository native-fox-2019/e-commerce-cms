const request = require("supertest");

const app = require('../app')

describe("POST /user/register", () => {
  test("can register as a new user", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'test@mail.com', password:test})
			.set('Accept', 'application/json')
			.expect(res.statusCode).toBe(201)
			.expect('Content-Type', /json/)
			.end((err, res) => {
					if(err){
						return done(err)
					}else{
						return done()
					}
			})
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty name", done => {
		request(app)
			.post('/user/register')
			.send({name:'', email:'test@mail.com', password:'test'})
			.set('Accept', 'application/json')
			.expect(function(res){
				res.body("Name can't be empty!")
			})
			.expect('Content-Type', /json/)
			.expect(400, done)
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty email", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'', password:'test'})
			.set('Accept', 'application/json')
			.expect(res.statusCode).toBe(400)
			.expect(function(res){
				res.body("Email can't be empty!")
			})
			.expect('Content-Type', /json/)
			.expect(400, done)
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty password", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'test@mail.com', password:''})
			.set('Accept', 'application/json')
			.expect(function(res){
				res.body("Password can't be empty!")
			})
			.expect('Content-Type', /json/)
			.expect(400, done)
  })  
})
