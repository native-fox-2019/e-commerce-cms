module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DEV,
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
    "username": "sztgfhaaqpuxxr",
    "password": "7f336d36386c2e14f3a260282b597e4c1ddba9e5aadef5e7db53e625c098cba5",
    "database": "d4ls1v4o8980tm",
    "host": "ec2-52-207-93-32.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
