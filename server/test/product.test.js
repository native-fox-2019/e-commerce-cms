
require("dotenv").config();
const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const jwt = require("jsonwebtoken");
const { generateTok } = require("../helper/tokenHelper");

let access_token_admin = null;
let access_token_user = null;
let invalid_access_token = null;
let idProduct;
let search = "makanan";
beforeAll(done => {
  let obj = {
    first_name: "gusti",
    last_name: "putra",
    email: "gusti@gusti.com",
    password: "12345",
    isAdmin: true
  };
  User.create(obj)
    .then(data => {
      access_token_admin = generateTok({
        id: data.id,
        email: data.email,
        isAdmin: data.isAdmin
      });
      let obj2 = {
        first_name: "bokir",
        last_name: "putra",
        email: "bokir@gmail.com",
        password: "12345",
        isAdmin: false
      };
      return User.create(obj2);
    })
    .then(data => {
      access_token_user = generateTok({
        id: data.id,
        email: data.email,
        isAdmin: data.isAdmin
      });
      done();
    })
    .catch(err => {
      done(err);
    });
});

afterAll(done => {
  queryInterface
    .bulkDelete("Products", {})
    .then(() => done())
    .catch(err => done(err));
});

describe("Test for products", function() {
  describe("Success add products", function() {
    it("Should return 201", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 50000,
          stock: 10,
          category: "makanan"
        })
        .then(res => {
          idProduct = res.body.id;
          const { body, status } = res;
          expect(status).toEqual(201);
          expect(body).toHaveProperty("name", "bakso");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe("Fail add products", function() {
    it("Should return 404, because invalid token", function(done) {
      request(app)
        .post("/products")
        .set("token", invalid_access_token)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 50000,
          stock: 10,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(404);
          expect(Array.isArray(body.message)).toBe(true);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 401, because role is user", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_user)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 50000,
          stock: 10,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(401);
          expect(body.message).toContain("you have no authority");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because price is less then zero", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: -1,
          stock: 10,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Validation min on price failed");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because stock is less then zero", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 1000,
          stock: -1,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Validation min on stock failed");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because not have name", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: null,
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 1000,
          stock: 5,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Product.name cannot be null");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because not have image url", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: null,
          image_url: "thisisurllink.com",
          price: 1000,
          stock: 5,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Product.description cannot be null");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because not have price", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: null,
          stock: 5,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Product.price cannot be null");
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    it("Should return 400, because not have stock", function(done) {
      request(app)
        .post("/products")
        .set("token", access_token_admin)
        .send({
          name: "bakso",
          description: "enak sekali",
          image_url: "thisisurllink.com",
          price: 10000,
          stock: null,
          category: "makanan"
        })
        .then(res => {
          const { body, status } = res;
          expect(status).toEqual(400);
          expect(body.message).toContain("Product.stock cannot be null");
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
  it("Should return 400, because not have category", function(done) {
    request(app)
      .post("/products")
      .set("token", access_token_admin)
      .send({
        name: "bakso",
        description: "enak sekali",
        image_url: "thisisurllink.com",
        price: 10000,
        stock: 5,
        category: null
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(400);
        expect(body.message).toContain("Product.category cannot be null");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Success read products", function() {
  it("Should return 200", function(done) {
    request(app)
      .get("/products")
      .set("token", access_token_admin)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(200);
        expect(Array.isArray(body.message)).toBe(false);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Success find all products by category", function() {
  it("Should return 200", function(done) {
    request(app)
      .get(`/products/filter/?key=${search}`)
      .set("token", access_token_admin)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(200);
        expect(body[0]).toHaveProperty("name", "bakso");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Fail filter products by category", function() {
  it("Should return 404 because id not found", function(done) {
    request(app)
      .get(`/products/baju`)
      .set("token", access_token_admin)
      .then(res => {
        const { body, status } = res;
        console.log(body.message);
        expect(status).toEqual(404);
        if (body.message === undefined) {
          body.message = "data not found";
        }
        expect(body.message).toContain("data not found");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Fail read products because invalid token", function() {
  it("Should return 401", function(done) {
    request(app)
      .get("/products")
      .set("token", invalid_access_token)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(404);
        expect(body.message[0]).toBe(null);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Success edit products", function() {
  it("Should return 200", function(done) {
    request(app)
      .put(`/products/${idProduct}`)
      .set("token", access_token_admin)
      .send({
        name: "bakso telor",
        description: "enak sekali",
        image_url: "thisisurllinktelor.com",
        price: 4000,
        stock: 19,
        category: "makanan"
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(200);
        expect(body[0]).toHaveProperty("name", "bakso telor");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Failed edit products", function() {
  it("Should return 404 because id not found", function(done) {
    request(app)
      .put(`/products/9999`)
      .set("token", access_token_admin)
      .send({
        name: "bakso telor",
        description: "enak sekali",
        image_url: "thisisurllinktelor.com",
        price: 4000,
        stock: 19,
        category: "makanan"
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(404);
        expect(body.message).toContain("data not found");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("Should return 403 because role is not admin", function(done) {
    request(app)
      .put(`/products/${idProduct}`)
      .set("token", access_token_user)
      .send({
        name: "bakso telor",
        description: "enak sekali",
        image_url: "thisisurllinktelor.com",
        price: 4000,
        stock: 19,
        category: "makanan"
      })
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(401);
        expect(body.message[0]).toBe("you have no authority");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Failed delete products", function() {
  it("Should return 404 because id not found", function(done) {
    request(app)
      .delete(`/products/9999`)
      .set("token", access_token_admin)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(404);
        expect(body.message).toContain("data not found");
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it("Should return 403 because role is not admin", function(done) {
    request(app)
      .delete(`/products/${idProduct}`)
      .set("token", access_token_user)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(401);
        expect(body.message).toContain("you have no authority");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});

describe("Success delete products", function() {
  it("Should return 200", function(done) {
    request(app)
      .delete(`/products/${idProduct}`)
      .set("token", access_token_admin)
      .then(res => {
        const { body, status } = res;
        expect(status).toEqual(200);
        expect(body).toContain("delete succesfull");
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});
