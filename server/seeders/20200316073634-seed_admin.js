'use strict';
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
  up: (queryInterface, Sequelize) => {
    let superUser = [{
      name: 'I Gusti Agung Agastya T',
      email: 'rqz.agastya@gmail.com',
      superUser: true,
      is_admin: true,
      password: bcrypt.hashSync(process.env.SUPER_PASS, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]
    return queryInterface.bulkInsert('Users', superUser)
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
    return queryInterface.bulkDelete('Users')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};