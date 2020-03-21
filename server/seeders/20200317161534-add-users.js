'use strict';
const { seedHash } = require('../helpers/bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        username: 'admin',
        email: 'admin@mail.com',
        password: seedHash('admin'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        username: 'user',
        email: 'user@mail.com',
        password: seedHash('user'),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
