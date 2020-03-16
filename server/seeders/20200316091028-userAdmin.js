'use strict';
const {encrypt} = require('../helpers/passwordBcrypt')
module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
          name: 'Admin',
          email: 'arif05rachman@gmail.com',
          password: encrypt('12345'),
          admin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
