const routes = require("express").Router();
const Controller = require("../controllers/product");

routes.get("/", Controller.get);
routes.post("/", Controller.create);

module.exports = routes;
