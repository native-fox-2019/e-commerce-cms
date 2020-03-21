require('dotenv').config()
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_DEV,
    "host": process.env.HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME_TEST,
    "host": process.env.HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": "cxtktciqifmfjd",
    "password": "8691ce097171b9875a9419c1333c8b9fb348b82963a75b0d68444da80cffb0bf",
    "database": "detfkni67l2rcs",
    "host": "ec2-52-207-93-32.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
