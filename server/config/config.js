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
    "username": "crqkurssjsatlp",
    "password": "5b81dc8682f6a3d6089fae248dc6cdfeeb6d2a58354e41b5575a9950ff4c2e18",
    "database": "dfl0j7l4vtc9su",
    "host": "ec2-52-45-14-227.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
