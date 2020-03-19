const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
const { User } = require("../models");
const { sign } = require("../helpers/jwt");

let access_token;
let user_token;
let wrong_token =
  "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmb29iYXJAZW1haWwuY29tIiwiaWF0IjoxNTgzODIzMjM5fQ.vL5RfRUdXW1ADJYkrSHSYbxyhvAOC613zN0PTSeXNa8";
let id;

beforeAll(async () => {
  let input = {
    name: "foo",
    email: "foobar@mail.com",
    password: "wadidaw",
    role: "admin"
  };
  let input2 = {
    name: "bar",
    email: "barfoo@mail.com",
    password: "wadidaw",
    role: "user"
  };

  let user1 = await User.create(input);
  access_token = sign({ id: user1.id, email: user1.email, role: user1.role });

  let { id, email, role } = await User.create(input2);
  user_token = sign({ id, email, role });
});

afterAll(done => {
  queryInterface
    .bulkDelete("Products", {})
    .then(() => done())
    .catch(err => done(err));
});

// CREATE
describe("Create new product", () => {
  describe("Create product successfully", () => {
    it("should return 200 and return created product", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "Bakwan",
          category: "Gorengan",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      id = body.Data.id;
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
          category: "Gorengan",
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
  describe("Category cannot be empty", () => {
    it("should return 400 and return message Validation notEmpty on category failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          category: "",
          image_url:
            "https://cdn-brilio-net.akamaized.net/news/2019/07/29/168048/1073028-1000xauto-resep-bakwan-kekinian.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on category failed"
      );
    });
  });
  describe("Price cannot be empty", () => {
    it("should return 400 and return message Validation isNumeric on price failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          category: "Gorengan",
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
          name: "bakwan",
          category: "Gorengan",
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
  describe("Price cannot be negative", () => {
    it("should return 400 and return message Validation min on price failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          category: "Gorengan",
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
  describe("Stock cannot be negative", () => {
    it("should return 400 and return message Validation min on stock failed", async () => {
      let { body, status } = await request(app)
        .post("/products")
        .send({
          name: "bakwan",
          category: "Gorengan",
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
  describe("User role not admin", () => {
    it("should return 403 and return message forbidden access role not admin", async () => {
      let { body, status } = await request(app)
        .post(`/products`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", user_token);
      expect(status).toBe(403);
      expect(body).toHaveProperty(
        "message",
        "Forbidden access role not admin."
      );
    });
  });
  describe("Invalid token", () => {
    it("should return 401 and return message invalid token", async () => {
      let { body, status } = await request(app)
        .post(`/products`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return message jwt must be provided", async () => {
      let { body, status } = await request(app)
        .post(`/products`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        });
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});

// UPDATE
describe("Start update product by id", () => {
  describe("Succesfully updated product", () => {
    it("should return 200 and return message successfully updated data", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(200);
      expect(body).toHaveProperty("Message", "Successfully updated product");
      expect(body).toHaveProperty("Data", expect.any(Object));
    });
  });
  describe("User role not admin", () => {
    it("should return 403 and return message forbidden access role not admin", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", user_token);
      expect(status).toBe(403);
      expect(body).toHaveProperty(
        "message",
        "Forbidden access role not admin."
      );
    });
  });
  describe("Name cannot be empty", () => {
    it("should return 400 and return message Validation notEmpty on name failed", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
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
  describe("Category cannot be empty", () => {
    it("should return 400 and return message Validation notEmpty on category failed", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(400);
      expect(body[0]).toHaveProperty(
        "message",
        "Validation notEmpty on category failed"
      );
    });
  });
  describe("Price cannot be empty", () => {
    it("should return 400 and return message Validation isNumeric on price failed", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
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
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
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
  describe("Price cannot be negative", () => {
    it("should return 400 and return message Validation min on price failed", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
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
  describe("Stock cannot be negative", () => {
    it("should return 400 and return message Validation min on stock failed", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
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
  describe("User role not admin", () => {
    it("should return 403 and return message forbidden access role not admin", async () => {
      let { body, status } = await request(app)
        .post(`/products`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", user_token);
      expect(status).toBe(403);
      expect(body).toHaveProperty(
        "message",
        "Forbidden access role not admin."
      );
    });
  });
  describe("Product not found", () => {
    it("should return 404 and return message product not found", async () => {
      let { body, status } = await request(app)
        .put(`/products/1000`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", access_token);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Not Found");
    });
  });
  describe("Invalid token", () => {
    it("should return 401 and return message invalid token", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        })
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return message jwt must be provided", async () => {
      let { body, status } = await request(app)
        .put(`/products/${id}`)
        .send({
          name: "risol",
          category: "Gorengan",
          image_url:
            "https://www.masakapahariini.com/wp-content/uploads/2019/02/risoles-ayam-telur-asin-780x440.jpg",
          price: 2000,
          stock: 5
        });
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});

// SHOW ALL
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
  describe("Invalid token provided", () => {
    it("should return 401 and return message invalid token", async () => {
      let { body, status } = await request(app)
        .get("/products")
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return message jwt must be provided", async () => {
      let { body, status } = await request(app).get("/products");
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});

// GET ONE
describe("Start get product by id", () => {
  describe("Get product succesfully", () => {
    it("should return 200 and return object of product data", async () => {
      let { body, status } = await request(app)
        .get(`/products/${id}`)
        .set("access_token", access_token);
      expect(status).toBe(200);
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("image_url");
      expect(body).toHaveProperty("price");
      expect(body).toHaveProperty("stock");
    });
  });
  describe("Product not found", () => {
    it("should return 404 and return message product not found", async () => {
      let { body, status } = await request(app)
        .get(`/products/1`)
        .set("access_token", access_token);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Product not found !");
    });
  });
  describe("Invalid token provided", () => {
    it("should return 401 and return message invalid token", async () => {
      let { body, status } = await request(app)
        .get(`/products/${id}`)
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return message jwt must be provided", async () => {
      let { body, status } = await request(app).get(`/products/${id}`);
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});

// DELETE PRODUCT
describe("Start delete product by id", () => {
  describe("Succesfully deleted product", () => {
    it("should return 200 and return message succesfully delete product", async () => {
      let { body, status } = await request(app)
        .delete(`/products/${id}`)
        .set("access_token", access_token);
      expect(status).toBe(200);
      expect(body).toHaveProperty("Message", "Successfully deleted product.");
    });
  });
  describe("User role not admin", () => {
    it("should return 403 and return message forbidden access role not admin", async () => {
      let { body, status } = await request(app)
        .delete(`/products/${id}`)
        .set("access_token", user_token);
      expect(status).toBe(403);
      expect(body).toHaveProperty(
        "message",
        "Forbidden access role not admin."
      );
    });
  });
  describe("Product not found", () => {
    it("should return 404 and return message product not found", async () => {
      let { body, status } = await request(app)
        .get(`/products/1`)
        .set("access_token", access_token);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Product not found !");
    });
  });
  describe("Invalid token provided", () => {
    it("should return 401 and return message invalid token", async () => {
      let { body, status } = await request(app)
        .delete(`/products/${id}`)
        .set("access_token", wrong_token);
      expect(status).toBe(401);
      expect(body).toHaveProperty("Message", "invalid token");
    });
  });
  describe("Token not provided", () => {
    it("should return 403 and return message jwt must be provided", async () => {
      let { body, status } = await request(app).delete(`/products/${id}`);
      expect(status).toBe(403);
      expect(body).toHaveProperty("Message", "jwt must be provided");
    });
  });
});
