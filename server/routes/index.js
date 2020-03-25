const routes = require("express").Router();
const user = require("./user");
const campaign = require("./campaign");
const product = require("./product");
const { authentication } = require("../middlewares/authentication");

routes.get("/", (req, res) => res.send("Welcome to e commerce"));
routes.use("/products", authentication, product);
routes.use("/campaign", authentication, campaign);
routes.use("/user", user);

module.exports = routes;
