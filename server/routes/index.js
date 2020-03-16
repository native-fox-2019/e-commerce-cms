const routes = require("express").Router();
const user = require("./user");
const product = require("./product");
const { authentication } = require("../middlewares/authentication");

routes.get("/", (req, res) => res.send("Welcome to e commerce"));
routes.use("/user", user);
routes.use("/products", authentication, product);

module.exports = routes;
