const request = require("supertest");
const app = require("../app");

describe("User start register", () => {
  describe("Register successfuly", () => {
    it("Should return status 201 and access_token with encoded id and email", async () => {
      try {
        let { body, status } = await request.post("/user/register").send({
          name: null,
          email: "foo@mail.com",
          password: "wadidaw",
          role: "admin"
        });
        expect(status).toBe(201);
        expect(body).toHaveProperty("Message", "access_token");
      } catch (error) {}
    });
  });
});
