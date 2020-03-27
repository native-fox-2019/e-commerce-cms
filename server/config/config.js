'use strict'
require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "e-commerce",
    "host": "localhost",
    "dialect": "postgres",
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "e-commerce",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "akmsjwbbyfepnl",
    "password": "a4f8a792b7226dbb36a670a46885c052dfb505b151a20065c6ca4265c7310bcf",
    "database": "dajqd10rlbojbr",
    "host": "ec2-34-200-101-236.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
