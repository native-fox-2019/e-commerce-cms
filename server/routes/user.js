const routes = require("express").Router();
const Controller = require("../controllers/user");
const { admin, user } = require("../middlewares/authorization");
const { authentication } = require("../middlewares/authentication");
const upload = require("../helpers/cloud");

routes.post("/login", Controller.login);
routes.post(
  "/register",
  authentication,
  admin,
  upload.single("file"),
  Controller.register
);
routes.put(
  "/:id",
  authentication,
  user,
  upload.single("file"),
  Controller.update
);
routes.get("/", authentication, Controller.get);
routes.get("/:id", authentication, Controller.getOne);
routes.delete("/:id", authentication, admin, Controller.delete);

module.exports = routes;
