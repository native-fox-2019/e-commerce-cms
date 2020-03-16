'use strict';

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
            password: 'test123',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
          }
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
