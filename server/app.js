"use strict";
const index = require('./routers/indexrouter')
// const errorHandling = require("./middleware/errorHandling");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(index)
//   .use(errorHandling)
  .listen(port, () => {
    console.log("listerning to port ", port);
  });
