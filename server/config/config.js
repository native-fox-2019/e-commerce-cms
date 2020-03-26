module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "e-commerce_dev",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "henarivanaa",
    "password": "wakwaw",
    "database": "e-commerce_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "vymxftkfnkwoxm",
    "password": "a4d9f5c731595206f603e5bd3301ba511b49b2f714829366636ea26dd0b0efc3",
    "database": "d6g0c0fdmu4m8l",
    "host": "ec2-3-229-210-93.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
