require("dotenv").config();
module.exports={
  "development": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": "e_commerce_project",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASS,
    "database": "e_commerce_project",
    "host": "127.0.0.1",
    "dialect": "postgres",
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}
