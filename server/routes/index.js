const routes = require("express").Router();
const user = require("./user");
const product = require("./product");

routes.get("/", (req, res) => res.send("Welcome to e commerce"));
routes.use("/user", user);
// routes.use("/products", product);

module.exports = routes;
