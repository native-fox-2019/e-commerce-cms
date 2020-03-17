const request = require("supertest");
const app = require('../app')
const { User } =  require('../models')

describe("POST /user/register check password is hashed?", () => {
  test("password can't be store if not hashed", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'test@mail.com', password:'test', role:'user' , role:'user'})
			.set('Accept', 'application/json')
			.expect(function (res){
				res.password === 'test'
			})
			.expect('Content-Type', /json/)
			.end((err, res) => {
					if(err){
						return done()
					}else{
						return done({message: "password not already hashed"})
					}
			})
  })  
})

describe("POST /user/register", () => {
  test("can register as a new user", done => {
		request(app)
			.post('/user/register')
			.set('Accept', 'application/json')
			.send({name:'Malik', email:'test@mail.com', password:'test', role:'user'})
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
  test("can't register, email already registered", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'test@mail.com', password:'test', role:'user' })
			.set('Accept', 'application/json')
			.expect(function(res){
				res.statusCode.toBe(401)
				res.body("Email already registered!")
			})
			.expect('Content-Type', /json/)
			.end((err, res) => {
					if(err){
						return done()
					}else{
						return done(res)
					}
			})
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty name", done => {
		request(app)
			.post('/user/register')
			.send({name:'', email:'test12@mail.com', password:'test', role:'user' })
			.set('Accept', 'application/json')
			.expect(function(res) {
				// console.log(res)
        res.body.message = "Name can't be empty!";
      })
			.expect('Content-Type', /json/)
			.expect(400, done)
  })  
})

// describe("POST /user/register", () => {
//   test("Test Error validation empty email", done => {
// 		request(app)
// 			.post('/user/register')
// 			.send({name:'Malik', email:'', password:'test', role:'user' })
// 			.set('Accept', 'application/json')
// 			.expect(res.statusCode).toBe(400)
// 			.expect(function(res){
// 				res.body("Email can't be empty!")
// 			})
// 			.expect('Content-Type', /json/)
// 			.expect(400, done)
//   })  
// })

// describe("POST /user/register", () => {
//   test("Test Error validation empty password", done => {
// 		request(app)
// 			.post('/user/register')
// 			.send({name:'Malik', email:'test@mail.com', password:'', role:'user'})
// 			.set('Accept', 'application/json')
// 			.expect(function(res){
// 				res.body("Password can't be empty!")
// 			})
// 			.expect('Content-Type', /json/)
// 			.expect(400, done)
//   })  
// })

// describe("POST /user/register", () => {
//   test("Test Error user fill role as admin", done => {
// 		request(app)
// 			.post('/user/register')
// 			.send({name:'Malik', email:'test@mail.com', password:'test', role:'admin'})
// 			.set('Accept', 'application/json')
// 			.expect(function(res){
// 				res.body("Forbidden Access!")
// 			})
// 			.expect('Content-Type', /json/)
// 			.expect(403, done)
//   })  
// })

// describe("POST /user/login", () => {
// 	test("Test correct valid email and password")
// 		request(app)
// 		.post('/user/login')
// 		.send({email: "test@mail.com", password: "test"})
// 		.set('Accept', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(200, done)
// })

// describe("POST /user/login", () => {
// 	test("Test correct valid email and password")
// 		request(app)
// 		.post('/user/login')
// 		.send({email: "test@mail.com", password: "test"})
// 		.set('Accept', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(200, done)
// })

// describe("POST /user/login", () => {
// 	test("Test wrong email")
// 		request(app)
// 		.post('/user/login')
// 		.send({email: "test@mail.comhahaa", password: "test"})
// 		.set('Accept', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(function(res){
// 			res.body("Wrong email or password!")
// 		})
// 		.expect(401, done)
// })

// describe("POST /user/login", () => {
// 	test("Test wrong password")
// 		request(app)
// 		.post('/user/login')
// 		.send({email: "test@mail.com", password: "wrongdadadada"})
// 		.set('Accept', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(function(res){
// 			res.body("Wrong email or password!")
// 		})
// 		.expect(401, done)
// })

// describe("POST /user/login", () => {
// 	test("Test empty form email")
// 		request(app)
// 		.post('/user/login')
// 		.send({email: "test@mail.comhahaa", password: "test"})
// 		.set('Accept', 'application/json')
// 		.expect('Content-Type', /json/)
// 		.expect(function(res){
// 			res.body("Email can't be empty!")
// 		})
// 		.expect(401, done)
// })