'use strict';

const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
        return queryInterface.bulkInsert('Users', 
        [
          {
            name: 'Adhiyatma Pramayoga',
            email: 'adhiyatma.pramayoga@gmail.com',
            password: bcrypt.hashSync('test123', 8),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Testing',
            email: 'test@gmail.com',
            password: bcrypt.hashSync('test123', 8),
            role: 'customer',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Testing 2',
            email: 'test2@gmail.com',
            password: bcrypt.hashSync('test123', 8),
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      */
     Example:
     return queryInterface.bulkDelete('Users', null, {});
  }
};
