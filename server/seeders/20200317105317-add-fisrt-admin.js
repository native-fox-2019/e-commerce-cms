'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'Admin',
      role: 'admin',
      email: 'fauzan@admin.com',
      password: '$2b$10$iZD.ixoTOzpQsxhSbS8oyudXjyH3eBVD1ZalYWfIB.mSDbOCw24qO',
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
