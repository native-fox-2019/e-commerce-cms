const routes = require("express").Router();
const Controller = require("../controllers/product");
const { authorization } = require("../middlewares/authorization");
const upload = require("../helpers/cloud");

routes.get("/", Controller.get);
routes.get("/:id", Controller.findOne);
routes.put("/:id", authorization, upload.single("file"), Controller.put);
routes.post("/", authorization, upload.single("file"), Controller.create);
routes.delete("/:id", authorization, Controller.delete);

module.exports = routes;
