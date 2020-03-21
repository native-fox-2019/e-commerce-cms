module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "saapjuihfsjqic",
    "password": "ef7bc9fb4b41c9a3b044ac69448dc011e938dd5b18fc66f1efd6b1111fb1c9d6",
    "database": "d6l3104hcmoe74",
    "host": "ec2-3-91-112-166.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
