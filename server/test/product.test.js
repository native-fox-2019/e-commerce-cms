const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User } = require("../models");
const { sign } = require("../helpers/jwt");

let access_token;
let wrong_token =
  "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29iYXJAZW1haWwuY29tIiwiaWF0IjoxNTgzODIzMjM5fQ.vL5RfRUdXW1ADJYkrSHSYbxyhvAOC613zN0PTSeXNa8";

beforeAll(async () => {
  let input = {
    name: "foo",
    email: "foobar@mail.com",
    password: "wadidaw",
    role: "admin"
  };
  let { id, email } = await User.create(input);
  access_token = sign({ id, email });
});

afterAll(done => {
  queryInterface
    .bulkDelete("Products", {})
    .then(() => done())
    .catch(err => done(err));
});

describe("Create new product", () => {
  describe("Create product successfully", () => {
    it("should return 200 and return created product", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "Bakwan",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(200);
      expect(body).toHaveProperty("Message", "Product created succesfully.");
      expect(body).toHaveProperty("Data", expect.any(Object));
    });
  });
  describe("Name cannot be empty", () => {
    it("should return 400 and return message Validation notEmpty on name failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on name failed"
      );
    });
  });
  describe("Image_url cannot be empty", () => {
    it("should return 400 and return message Validation notEmpty on image_url failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          image_url: "",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on image_url failed"
      );
    });
  });
  describe("Price cannot be empty", () => {
    it("should return 400 and return message Validation isNumeric on price failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: "",
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation isNumeric on price failed"
      );
    });
  });
  describe("Stock cannot be empty", () => {
    it("should return 400 and return message Validation isNumeric on stock failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwa",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: ""
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation isNumeric on stock failed"
      );
    });
  });
  describe("Price cannot be empty", () => {
    it("should return 400 and return message Validation min on price failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: -1,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation min on price failed"
      );
    });
  });
  describe("Price cannot be empty", () => {
    it("should return 400 and return message Validation min on stock failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: -1
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation min on stock failed"
      );
    });
  });
});

describe("Start get product", () => {
  describe("Get product succesfully", () => {
    it("should return 200 and return array of product data", async () => {
      let { body, status } = await request(app)
        .get("/products")
        .set("access_token", access_token);
      expect(status).toBe(200);
      expect(Array.isArray(body)).toBe(true);
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return array of product data", async () => {
      let { body, status } = await request(app)
        .get("/products")
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return array of product data", async () => {
      let { body, status } = await request(app).get("/products");
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});
