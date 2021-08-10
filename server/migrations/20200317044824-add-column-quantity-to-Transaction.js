'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn("Transactions", 'quantity', { type: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Transactions', "quantity", { type: Sequelize.INTEGER });
  }
};
