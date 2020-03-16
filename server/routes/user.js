const routes = require("express").Router();
const Controller = require("../controllers/user");

routes.post("/login", Controller.login);
routes.post("/register", Controller.register);

module.exports = routes;
