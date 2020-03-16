module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-commerce-dev",
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-commerce-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-commerce",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
