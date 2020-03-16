const request = require("supertest");
const app = require("../app");
const { verify } = require("../helpers/jwt");

describe("User start register", () => {
  it("Register successfuly", () => {
    test("Should return status 201 and access_token with encoded id and email", async () => {
      try {
        let { body, status } = await request.post("/user/register").send({
          name: "foo",
          email: "foo@mail.com",
          password: "wadidaw",
          role: "admin"
        });
        const { access_token } = body;
        const payload = verify(access_token);
        expect(status).toBe(201);
        expect(body).toHaveProperty("Message", "access_token");
      } catch (error) {}
    });
  });
});
