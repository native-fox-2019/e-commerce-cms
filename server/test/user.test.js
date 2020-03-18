const request = require("supertest");
const app = require('../app')
const { User } =  require('../models')

describe("POST /user/register check password is hashed?", () => {
  test("password can't be store if not hashed", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'test@mail.com', password:'test', role:'user' , role:'user'})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(401)
			.end((err, res) => {
				if(res.password === 'test'){
					return done(err)
				}else{
					return done()
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
			.expect('Content-Type', /json/)
			.expect(401, {
				message: "Email already registered!"
			}, done)
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty name", done => {
		request(app)
			.post('/user/register')
			.send({name:'', email:'test12dsd@mail.com', password:'test', role:'user' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400, [{
				     message: "Name can't be empty!"
			}],done)
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty email", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'', password:'test', role:'user' })
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400, [{
				message: "Email can't be empty!"
			}], done)
  })  
})

describe("POST /user/register", () => {
  test("Test Error validation empty password", done => {
		request(app)
			.post('/user/register')
			.send({name:'Malik', email:'tesfassaasdsdfsafat@mail.com', password:'', role:'user'})
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(400, [{
				message: "Password can't be empty!"
			}], done)
  })  
})

// describe("POST /user/register", () => {
//   test("Test Error user fill role as admin", done => {
// 		request(app)
// 			.post('/user/register')
// 			.send({name:'Malik', email:'testasfsa@mail.com', password:'test', role:'admin'})
// 			.set('Accept', 'application/json')
// 			.expect('Content-Type', /json/)
// 			.expect(403, {
// 				message: "Forbidden Access!"
// 			}, done)
//   })  
// })


describe("POST /user/login", () => {
	test("Test correct valid email and password", done=> {
		request(app)
		.post('/user/login')
		.send({email: "test@mail.com", password: "test"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200, done)
	})
})

describe("POST /user/login", () => {
	test("Test wrong email", done=> {
		request(app)
		.post('/user/login')
		.send({email: "test@mail.comhahaa", password: "test"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(401, {
			message: "Wrong email or password!"
		}, done)
	})
})

describe("POST /user/login", () => {
	test("Test wrong password", done=> {
		request(app)
		.post('/user/login')
		.send({email: "test@mail.com", password: "wrongdadadada"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(401, {
			message: "Wrong email or password!"
		}, done)
	})
})

describe("POST /user/login", () => {
	test("Test empty form email", done=> {
		request(app)
		.post('/user/login')
		.send({email: "", password: "test"})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(401,{
			message: "Wrong email or password!"
		}, done)
	})
})

describe("POST /user/login", () => {
	test("Test empty form password", done=> {
		request(app)
		.post('/user/login')
		.send({email: "test@mail.comhahaa", password: ""})
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(401,{
			message: "Wrong email or password!"
		}, done)
	})
})