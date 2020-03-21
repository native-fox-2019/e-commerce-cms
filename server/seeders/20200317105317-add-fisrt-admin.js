'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
  up: (queryInterface, Sequelize) => {
    let hash = bcrypt.hash('1234', saltRounds)
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      role: 'admin',
      email: 'fauzan@admin.com',
      password: hash,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
