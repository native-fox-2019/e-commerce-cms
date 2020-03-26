'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Arcade',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Adventure',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Simulation',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
