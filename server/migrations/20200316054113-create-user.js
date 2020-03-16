'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Username cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Username cannot be empty!'
          }
        }
      },
      email:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Email cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty!'
          }
        }
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Password cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty!'
          }
        }
      },
      role:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Role cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Role cannot be empty!'
          },
          isIn: {
            args: ['admin','user'],
            msg: 'Role must be either admin or user!'
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};