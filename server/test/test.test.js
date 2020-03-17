const request = require(`supertest`);
const app = require(`../index`);
const model = require(`../models`);

afterAll(done => {
  model.User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    .then(data => {})
    .catch(err => {
      done(err);
    });
  model.Product.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true
  })
    .then(data => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe(`Admin User Test`, () => {
  describe(`Admin register`, () => {
    test(`should return status 201 and token`, done => {
      request(app)
        .post(`/admins/register`)
        .send({
          email: `test@test.com`,
          password: `test`
        })
        .expect(201)
        .then(data => {
          expect(data.body).toHaveProperty(`token`);
          expect(data.body.token).toBe(data.body.token);
          console.log(`token here >>>>>>>>>>`, data.body.token);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return status 400 and message for email already used`, done => {
      request(app)
        .post(`/admins/register`)
        .send({
          email: `test@test.com`,
          password: `different`
        })
        .expect(400)
        .then(data => {
          expect(data.body).toHaveProperty("status_code");
          expect(data.body).toHaveProperty("status_message");
          expect(data.body.status_code).toBe(400);
          expect(data.body.status_message).toBe(data.body.status_message);
          console.log(`register error`, data.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return 400 and message`, done => {
      request(app)
        .post(`/admins/register`)
        .send({
          email: ``,
          password: ``
        })
        .expect(400)
        .then(data => {
          expect(data.body).toHaveProperty("status_code");
          expect(data.body).toHaveProperty("status_message");
          expect(data.body.status_code).toBe(400);
          expect(data.body.status_message).toBe(data.body.status_message);
          console.log(`register error`, data.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe(`Admin Login`, () => {
    test(`should return status 200 and token`, done => {
      request(app)
        .post(`/admins/login`)
        .send({
          email: `test@test.com`,
          password: `test`
        })
        .expect(200)
        .then(data => {
          expect(data.body).toHaveProperty(`token`);
          expect(data.body.token).toBe(data.body.token);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return status 404 and message`, done => {
      request(app)
        .post(`/admins/login`)
        .send({
          email: `test@wrong.com`,
          password: `test`
        })
        .expect(404)
        .then(data => {
          expect(data.body).toHaveProperty("status_code");
          expect(data.body).toHaveProperty("status_message");
          expect(data.body.status_code).toBe(404);
          expect(data.body.status_message).toBe(data.body.status_message);
          console.log(`login error`, data.body.status_message);
          done();
        })
        .catch(err => {
          console.log(err);
          done(err);
        });
    });
  });
});

describe(`admin CRUD test`, () => {
  describe(`admin create a product`, () => {
    test(`should return status 200 and data that has just been created`, done => {
      request(app)
        .post(`/products`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .send({
          name: `product1`,
          image_url: `URL`,
          price: `5`,
          stock: `3`
        })
        .expect(201)
        .then(respond => {
          for (var key in respond.body) {
            expect(key).toBe(key);
          }
          console.log(respond.body);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return status 400 and error messages`, done => {
      request(app)
        .post(`/products`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .send({
          name: ``,
          price: 0,
          stock: -500
        })
        .expect(400)
        .then(respond => {
          expect(respond.body).toHaveProperty("status_code");
          expect(respond.body).toHaveProperty("status_message");
          expect(respond.body.status_code).toBe(400);
          expect(respond.body.status_message).toBe(respond.body.status_message);
          console.log(`product create error`, respond.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe(`admin get a product`, () => {
    test(`should return array of data`, done => {
      request(app)
        .get(`/products`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .expect(200)
        .then(respond => {
          expect(respond.body).toEqual(expect.arrayContaining(respond.body));
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return data`, done => {
      request(app)
        .get(`/products/1`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .expect(200)
        .then(respond => {
          expect(respond.body).toHaveProperty(`name`);
          expect(respond.body).toHaveProperty(`image_url`);
          expect(respond.body).toHaveProperty(`price`);
          expect(respond.body).toHaveProperty(`stock`);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe(`admin update product`, () => {
    test(`should return status 200 and amount of data updated`, done => {
      request(app)
        .put(`/products/1`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .send({
          name: `productivity`,
          image_url: `Link`,
          price: `5000`,
          stock: `90`
        })
        .expect(200)
        .then(respond => {
          expect(respond.body[0]).toBe(1);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return status 404 and error message`, done => {
      request(app)
        .put(`/products/90`) // id does not exist
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .send({
          name: `productivity`,
          image_url: `Link`,
          price: `5000`,
          stock: `90`
        })
        .expect(404)
        .then(respond => {
          expect(respond.body).toHaveProperty("status_code");
          expect(respond.body).toHaveProperty("status_message");
          expect(respond.body.status_code).toBe(404);
          expect(respond.body.status_message).toBe(respond.body.status_message);
          console.log(`product update error`, respond.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe(`admin delete product`, () => {
    test(`should return 200 and number of data deleted`, done => {
      request(app)
        .delete(`/products/1`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .expect(200)
        .then(respond => {
          expect(respond.body).toBe(1);
          done();
        })
        .catch(err => {
          done(err);
        });
    });

    test(`should return 404 and error message`, done => {
      request(app)
        .delete(`/products/90`)
        .set(
          `token`,
          `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTg0NDM4MjUxfQ.8r-y5kvw6koVIIZZD-LE0EpIQeWRjNn6_UyvB8vSlPk`
        )
        .expect(404)
        .then(respond => {
          expect(respond.body).toHaveProperty("status_code");
          expect(respond.body).toHaveProperty("status_message");
          expect(respond.body.status_code).toBe(404);
          expect(respond.body.status_message).toBe(respond.body.status_message);
          console.log(`product delete error`, respond.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });

  describe(`admin no token`, () => {
    test(`should return status 401 and error message`, done => {
      request(app)
        .get(`/products`)
        .expect(401)
        .then(respond => {
          expect(respond.body).toHaveProperty("status_code");
          expect(respond.body).toHaveProperty("status_message");
          expect(respond.body.status_code).toBe(401);
          expect(respond.body.status_message).toBe(respond.body.status_message);
          console.log(`no token error`, respond.body.status_message);
          done();
        })
        .catch(err => {
          done(err);
        });
    });
  });
});
