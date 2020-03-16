require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "e-commerce_development",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "e-commerce_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
