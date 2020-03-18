'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Carts', [
      {
        ProductId: 1,
        UserId: 2,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ProductId: 2,
        UserId: 2,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Carts', null, {});
  }
};
