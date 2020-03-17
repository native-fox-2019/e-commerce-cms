if (process.env.NODE_ENV === `test` || process.env.NODE_ENV === `development`) {
  require(`dotenv`).config()
}

module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-com_CMS",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "e-com_CMS-test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}