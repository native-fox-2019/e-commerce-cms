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
    "username": "livjddmbmzrkyl",
    "password": "ea870d2d741c55eca14c9d5779304cad7cdcad0e5862a5907411f4bb41359b39",
    "database": "db5enitrqtr5ta",
    "host": "ec2-52-201-55-4.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
