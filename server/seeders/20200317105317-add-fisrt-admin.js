'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = {
  up: (queryInterface, Sequelize) => {
    const hash = bcrypt.hashSync('1234', salt);
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Fauzan',
        role: 'admin',
        email: 'fauzan@admin.com',
        password: hash,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name: 'Fauzan',
        role: 'user',
        email: 'fauzan@user.com',
        password: hash,
        createdAt : new Date(),
        updatedAt : new Date()
        }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
