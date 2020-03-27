'use strict';

const bcrypt = require('bcrypt')
const salt = 10
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email:'admin@admin.com',
        password:bcrypt.hashSync('123', salt),
        role:'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }],{})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
