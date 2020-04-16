'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ShoppingCarts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'User ID cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'User ID cannot be empty!'
          },
          isInt: {
            args: true,
            msg: 'User ID must be integer!'
          },
          min: {
            args: 1,
            msg: 'User ID cannot be negative value!'
          }
        }
      },
      ProductId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Product ID cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Product ID cannot be empty!'
          },
          isInt: {
            args: true,
            msg: 'Product ID must be integer!'
          },
          min: {
            args: 1,
            msg: 'Product ID cannot be negative value!'
          }
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Quantity cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Quantity cannot be empty!'
          },
          isInt: {
            args: true,
            msg: 'Quantity must be integer!'
          },
          min: {
            args: 1,
            msg: 'Quantity cannot be negative value!'
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
    return queryInterface.dropTable('ShoppingCarts');
  }
};