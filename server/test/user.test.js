const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

afterAll(done => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch(err => done(err));
});

describe("Test for Admin", function() {
  describe("Success register Admin", function() {
    it("Should return 201", function(done) {
      request(app)
        .post("/user/register")
        .send({
          first_name: "gusti",
          last_name: "putra",
          email: "gusti1@gusti.com",
          password: "12345"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(201);
          expect(body).toHaveProperty("first_name", "gusti");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
describe("Test for user", function() {
  describe("Success register user", function() {
    it("Should return 201", function(done) {
      request(app)
        .post("/user/register")
        .send({
          first_name: "bokir",
          last_name: "putra",
          email: "bokir1@gmail.com",
          password: "12345",
          isAdmin: false
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(201);
          expect(body).toHaveProperty("first_name", "bokir");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});

it('Should return 400 because first name is empty', function(done) {
    request(app)
      .post('/user/register')
      .send({
        first_name: null,
        last_name: "putra",
        email: "bokir@gmail.com",
        password: "12345"
         
      })
      .then(res => {
          const { body, status } = res
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message')
          expect(body.message).toContain("User.first_name cannot be null")
          done()
      })
      .catch(err=>{
          done(err)
      })
  });

it('Should return 400 because last name is empty', function(done) {
    request(app)
      .post('/user/register')
      .send({
        first_name: "bokir",
        last_name: null,
        email: "bokir@gmail.com",
        password: "12345"
         
      })
      .then(res => {
          const { body, status } = res
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message')
          expect(body.message).toContain("User.last_name cannot be null")
          done()
      })
      .catch(err=>{
          done(err)
      })
  });

it('Should return 400 because email is empty', function(done) {
    request(app)
      .post('/user/register')
      .send({
        first_name: 'bokir',
        last_name: "putra",
        email: null,
        password: "12345"
         
      })
      .then(res => {
          const { body, status } = res
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message')
          expect(body.message).toContain("User.email cannot be null")
          done()
      })
      .catch(err=>{
          done(err)
      })
  });

  it('Should return 400 because email has used by other user', function(done) {
    request(app)
      .post('/user/register')
      .send({
        first_name: 'bokir',
        last_name: "putra",
        email: "bokir@gmail.com",
        password: "12345"
         
      })
      .then(res => {
          const { body, status } = res
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message')
          expect(body.message).toContain("email has been used by other user!")
          done()
      })
      .catch(err=>{
          done(err)
      })
  });

it('Should return 400 because password is empty', function(done) {
    request(app)
      .post('/user/register')
      .send({
        first_name: 'bokir',
        last_name: "putra",
        email: "bokir@gmail.com",
        password: null
         
      })
      .then(res => {
          const { body, status } = res
          expect(status).toEqual(400)
          expect(body).toHaveProperty('message')
          expect(body.message).toContain("User.password cannot be null")
          done()
      })
      .catch(err=>{
          done(err)
      })
  });


  describe("Test for Admin", function() {
    describe("login successful as Admin", function() {
      it("Should return 200", function(done) {
        request(app)
          .post("/user/login")
          .send({
            email: "gusti@gusti.com",
            password: "12345"
          })
          .then(res => {
            const { body, status } = res;
            expect(status).toEqual(200);
            expect(body).toHaveProperty("token");
            done();
          })
          .catch(err => {
            done(err);
          });
      })
    })
  })

  describe("login successful as User", function() {
    it("Should return 200", function(done) {
      request(app)
        .post("/user/login")
        .send({
          email: "bokir@gmail.com",
          password: "12345"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(200);
          expect(body).toHaveProperty("token");
          done();
        })
        .catch(err => {
          done(err);
        });
    })
  })

