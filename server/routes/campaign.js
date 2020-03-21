const routes = require("express").Router();
const Controller = require("../controllers/campaign");
const { authorization } = require("../middlewares/authorization");
const upload = require("../helpers/cloud");

routes.get("/", Controller.get);
routes.get("/:id", Controller.getOne);
routes.post("/", authorization, upload.single("file"), Controller.create);
routes.put("/:id", authorization, upload.single("file"), Controller.update);
routes.delete("/:id", authorization, Controller.delete);

module.exports = routes;
