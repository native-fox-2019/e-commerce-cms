const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User, Product } = require("../models");
const { create } = require("../helpers/token");

let ADMIN_TOKEN;
let USER_TOKEN;
let PRODUCT_NAME = "Big Box";
let IMG_URL = "www.bing.com";
let PRICE = 10000;
let STOCK = 10;
let ID;
let ID2;

//creating dummy data for passing token purpose
beforeAll(done => {
  User.create({
    name: "admin",
    email: "admin@admin.com",
    password: "admin",
    role: "admin"
  })
    .then(admin => {
      ADMIN_TOKEN = create({
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      });
      return User.create({
        name: "User",
        email: "user@user.com",
        password: "user"
      });
    })
    .then(user => {
      USER_TOKEN = create({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      });
      done();
    });
});

afterAll(done => {
  queryInterface
    .bulkDelete("Products", {})
    .then(() => done())
    .catch(err => done(err));
});
afterAll(done => {
  queryInterface
    .bulkDelete("Users", {})
    .then(() => done())
    .catch(err => done(err));
});

//CREATE
describe("adding new product", () => {
  describe("Success", () => {
    it("success adding new product", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: PRODUCT_NAME,
          image_url: IMG_URL,
          price: PRICE,
          stock: STOCK
        })
        .then(response => {
          const { body, status } = response;
          ID = body.id;
          expect(status).toBe(201);
          expect(body).toHaveProperty("id");
          expect(body).toHaveProperty("name", PRODUCT_NAME);
          expect(body).toHaveProperty("image_url", IMG_URL);
          expect(body).toHaveProperty("price", PRICE);
          expect(body).toHaveProperty("stock", STOCK);
          done();
        });
    });
  });
  describe("Failed", () => {
    it("Name empty / null", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "",
          image_url: "www.google.com",
          price: 10000,
          stock: 100
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Name cannot be empty");
          done();
        });
    });
    it("Image url empty / null", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Black Box",
          image_url: "",
          price: 10000,
          stock: 100
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Image url cannot be empty");
          done();
        });
    });
    it("Price empty / null", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Black Box",
          image_url: "www.google.com",
          price: "",
          stock: 100
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Price cannot be empty");
          done();
        });
    });
    it("Stock empty / null", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Black Box",
          image_url: "www.google.com",
          price: 10000,
          stock: ""
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Stock cannot be empty");
          done();
        });
    });
    it("User role try to add new product", done => {
      request(app)
        .post("/products/add")
        .set({ access_token: USER_TOKEN })
        .send({
          name: "Black Box",
          image_url: "www.google.com",
          price: 10000,
          stock: 50
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("msg", "Unauthorized access");
          done();
        });
    });
  });
});

// READ
describe("showing all products", () => {
  describe("success showing", () => {
    it("get all product list", done => {
      request(app)
        .get("/products")
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(200);
          done();
        });
    });
  });
});

//UPDATE
describe("updating product", () => {
  describe("success updating", () => {
    it("updating product", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "www.yahoo.com",
          price: 50000,
          stock: 30
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(201);
          expect(body).toHaveProperty("msg", "Product updated");
          done();
        });
    });
  });
  describe("fail updating", () => {
    it("name is empty", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "",
          image_url: "www.yahoo.com",
          price: 50000,
          stock: 30
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Name cannot be empty");
          done();
        });
    });
    it("Image url is empty", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "",
          price: 50000,
          stock: 30
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Image url cannot be empty");
          done();
        });
    });
    it("Price is empty", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "www.yahoo.com",
          price: "",
          stock: 30
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Price cannot be empty");
          done();
        });
    });
    it("Stock is empty", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "www.yahoo.com",
          price: 50000,
          stock: ""
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(400);
          expect(body).toContain("Stock cannot be empty");
          done();
        });
    });
    it("Non exist ID", done => {
      request(app)
        .put(`/products/edit/100`)
        .set({ access_token: ADMIN_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "www.yahoo.com",
          price: 50000,
          stock: 100
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("msg", "Cannot be found");
          done();
        });
    });
    it("User role trying to update product", done => {
      request(app)
        .put(`/products/edit/${ID}`)
        .set({ access_token: USER_TOKEN })
        .send({
          name: "Blue Box",
          image_url: "www.yahoo.com",
          price: 50000,
          stock: 100
        })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("msg", "Unauthorized access");
          done();
        });
    });
  });
});

//DELETE
describe("deleting product", () => {
  describe("success deleting product", () => {
    it("delete product", done => {
      request(app)
        .delete(`/products/delete/${ID}`)
        .set({ access_token: ADMIN_TOKEN })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("msg", "Product deleted");
          done();
        });
    });
  });
  describe("fail deleting product", () => {
    it("delete unexisting product", done => {
      request(app)
        .delete(`/products/delete/100`)
        .set({ access_token: ADMIN_TOKEN })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("msg", "Cannot be found");
          done();
        });
    });
    it("User role trying to delete product", done => {
      request(app)
        .delete(`/products/delete/${ID2}`)
        .set({ access_token: USER_TOKEN })
        .then(response => {
          const { body, status } = response;
          expect(status).toBe(404);
          expect(body).toHaveProperty("msg", "Unauthorized access");
          done();
        });
    });
  });
});
