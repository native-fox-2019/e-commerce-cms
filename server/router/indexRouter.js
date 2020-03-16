"use strict"
const user = require("./userRouter")
const Router = require("express").Router()
const product = require("./productRouter");
const admin = require("./adminRouter");

Router
    .use('/products',product)
    // .use("/admin", admin)
    .use('/user', user)

module.exports = Router