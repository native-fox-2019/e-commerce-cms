const routes = require("express").Router();
const Controller = require("../controllers/product");
const { authorization } = require("../middlewares/authorization");

routes.get("/", Controller.get);
routes.get("/:id", Controller.findOne);
routes.put("/:id", authorization, Controller.put);
routes.post("/", authorization, Controller.create);
routes.delete("/:id", authorization, Controller.delete);

module.exports = routes;
