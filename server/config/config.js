require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce-cms",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce-cms-test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "jmwclftvaoptnw",
    "password": "309de1cb50a2acaac1fcf5aabc305dd0a071852ed86adb55d334385f32798c76",
    "database": "d7uejled3ktdjt",
    "host": "ec2-3-223-21-106.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
