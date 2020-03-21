'use strict';

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
        password: '$2b$07$6nSnM5HQH8dCfyie/WhCIe.cqs2yjn5NSrJXPFaOgmUJe16M2TCfe',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    },{
        username: 'user',
        email: 'user@mail.com',
        password: '$2b$07$fMe4yY.hWobQU3wqmp1teO7ovN6PntAT9ij5CpSos/NZTcHD/mvzm',
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
