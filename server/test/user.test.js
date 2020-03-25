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

describe("User start register", () => {
  describe("Register successfuly", () => {
    it("Should return status 201 and access_token with encoded id and email", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "foo",
          email: "foo@mail.com",
          password: "wadidaw",
          role: "admin"
        });
      expect(status).toBe(201);
      expect(body).toHaveProperty("access_token", expect.any(String));
      expect(body).toHaveProperty("Message", "Successfully create user");
    });
  });
  describe("Email must be unique", () => {
    it("Should return status 400 and return message errors email must be unique", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "foo",
          email: "foo@mail.com",
          password: "wadidaw",
          role: "admin"
        });
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty("message", "email must be unique");
    });
  });
  describe("Name cannot be empty", () => {
    it("Should return status 400 and return message Validation notEmpty on name failed", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "",
          email: "foo@mail.com",
          password: "wadidaw",
          role: "admin"
        });
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on name failed"
      );
    });
  });
  describe("Email cannot be empty", () => {
    it("Should return status 400 and return message Validation notEmpty on email failed", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "foo",
          email: "",
          password: "wadidaw",
          role: "admin"
        });
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on email failed"
      );
    });
  });
  describe("Password cannot be empty", () => {
    it("Should return status 400 and return message Validation notEmpty on password failed", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "foo",
          email: "foo@mail.com",
          password: "",
          role: "admin"
        });
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on password failed"
      );
    });
  });
  describe("Role cannot be empty", () => {
    it("Should return status 400 and return message Validation notEmpty on role failed", async () => {
      let { body, status } = await request(app)
        .post("/user/register")
        .send({
          name: "foo",
          email: "foo@mail.com",
          password: "wadidaw",
          role: ""
        });
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on role failed"
      );
    });
  });
});

describe("User start login", () => {
  describe("Login successfuly", () => {
    it("Should return status 200 and access_token with encoded id and email", async () => {
      let { body, status } = await request(app)
        .post("/user/login")
        .send({
          email: "foo@mail.com",
          password: "wadidaw"
        });
      expect(status).toBe(200);
      expect(body).toHaveProperty("access_token", expect.any(String));
    });
  });
  describe("Invalid password", () => {
    it("Should return status 400 and error message invalid user password", async () => {
      let { body, status } = await request(app)
        .post("/user/login")
        .send({
          email: "foo@mail.com",
          password: ""
        });
      expect(status).toBe(400);
      expect(body).toHaveProperty("message", "Invalid User Password");
    });
  });
  describe("User not found", () => {
    it("Should return status 400 and message data not found", async () => {
      let { body, status } = await request(app)
        .post("/user/login")
        .send({
          email: "",
          password: "wadidaw"
        });
      expect(status).toBe(404);
      expect(body).toHaveProperty("Message", "Data Not Found");
    });
  });
});
