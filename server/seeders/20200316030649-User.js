'use strict';

const bcrypt = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      username: 'marcel',
      password: bcrypt.hashing('12345'),
      email: 'marcel.admin@gmail.com',
      admin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'UserBiasa',
      password: bcrypt.hashing('12345'),
      email: 'marcel.biasa@gmail.com',
      admin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
