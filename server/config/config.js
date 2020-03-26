module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "ecommerce_development",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "ecommerce_test",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "qdlendtwgeodpr",
    "password": "ff18083161aa30d3fd09b2d337e475ad1109fcbc020571fff48c3a968d80d7fe",
    "database": "d430r5vm087c8b",
    "host": "ec2-18-213-176-229.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
