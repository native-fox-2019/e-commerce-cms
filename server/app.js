"use strict";
require("dotenv").config();
const index = require('./router/indexRouter')
const errorHandling = require("./middleware/errorHandling");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(index)
  .use(errorHandling)
  .listen(port, () => {
    console.log("listerning to port ", port);
  });

  module.exports = app
