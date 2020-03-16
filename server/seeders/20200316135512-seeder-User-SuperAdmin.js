'use strict';

const bcrypt = require('bcrypt')
const salt = 10
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        name:'Admin',
        email:'admin@admin.com',
        password:bcrypt.hashSync('123', salt),
        role:'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
    }],{})
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
  }
};
