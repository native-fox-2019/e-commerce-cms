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
    "username": "zqjnrhrfbtjxhn",
    "password": "24382ee547581316507a2d7f504ed38abe6348797779fe8862e111e445ce70ea",
    "database": "dactkar0f2hre0",
    "host": "ec2-52-207-93-32.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
