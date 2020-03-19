const routes = require("express").Router();
const Controller = require("../controllers/user");
const { admin } = require("../middlewares/authorization");

routes.post("/login", Controller.login);
routes.post("/register", admin, Controller.register);

module.exports = routes;
