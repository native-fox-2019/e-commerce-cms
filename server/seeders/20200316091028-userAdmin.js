'use strict';
const {encrypt} = require('../helpers/passwordBcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Admin',
        email: 'admin@email.com',
        password: encrypt('12345'),
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'user',
        email: 'user@email.com',
        password: encrypt('12345'),
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
