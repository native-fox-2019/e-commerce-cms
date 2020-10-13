module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || 'postgres',
    "password": process.env.DB_PASSWORD || 'postgres',
    "database": process.env.DB_NAME || 'e-commerce',
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-commerce_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
}
