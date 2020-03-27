"use strict"
const userController = require("../controllers/userController");
const Router = require("express").Router()

Router
  .post("/login", userController.login)
  .post("/register", userController.register)
  // .post("/googleLogin", userController.googleLogin);

module.exports = Router;
