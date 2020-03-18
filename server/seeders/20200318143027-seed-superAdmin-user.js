'use strict';
const { hash } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let hashed = await hash('12345')
    return queryInterface.bulkInsert('Users', [{
      name: 'Bambang Pamungkas',
      email: 'bambang@gmail.com',
      password: hashed,
      role: 'superAdmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
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
