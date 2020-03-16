/** @format */

"use strict";
const productController = require("../controllers/productController");
const router = require("express").Router();
const authentication = require("../middleware/authentication");

router
  .use(authentication)
  .post("/", productController.create)
  .get("/", productController.findAll)
  .get("/:id", productController.filterData)
  .put("/:id", productController.update)
  .delete("/:id", productController.delete);

module.exports = router;
