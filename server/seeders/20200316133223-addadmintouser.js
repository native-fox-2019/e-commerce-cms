'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
        {
          email: 'admin@admin.com',
          password: '$2b$10$ntk93rltzXUuElxIRFrGgO8rEj.lxteBwZOUUwf1rd0DC1KcABGn2',
          role: 'Admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'admin2@admin.com',
          password: '$2b$10$ntk93rltzXUuElxIRFrGgO8rEj.lxteBwZOUUwf1rd0DC1KcABGn2',
          role: 'User',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
