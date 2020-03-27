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
    "username": "wdnkaumnjsgnhy",
    "password": "b0c601f358cead28e615e39e2ced897684312944b35e95c3a0b477eea0d958fe",
    "database": "d45kvdj3flck3q",
    "host": "ec2-50-17-178-87.compute-1.amazonaws.com",
    "dialect": "postgres",
  }
}
