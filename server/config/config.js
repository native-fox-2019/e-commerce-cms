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
    username: "tzlxcapaqmrunf",
    password: "70de2725133cacd153cc88b13aae2387bee7a541f7ea63c894f510d16dbc6cbb",
    database: "dac0aqcc7r321b",
    host: "ec2-34-200-101-236.compute-1.amazonaws.com",
    dialect: "postgres"
  }
};
