/** @format */

"use strict";
const productController = require("../controllers/productController");
const router = require("express").Router();
const authentication = require("../middleware/authentication");
const authorization = require('../middleware/authorization')

router
  .use(authentication)
  .post("/", authorization, productController.create)
  .get("/", productController.findAll)
  .get("/filter", productController.filterData)
  .put("/:id", authorization, productController.update)
  .delete("/:id", authorization, productController.delete);

module.exports = router;
