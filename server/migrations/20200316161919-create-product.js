'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Product name cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Product name cannot be empty!'
          }
        }
      },
      image_url: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Product Image URL cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Product Image URL cannot be empty!'
          }
        }
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Product price cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Product price cannot be empty!'
          },
          isInt: {
            args: true,
            msg: 'Product price must be integer!'
          },
          min: {
            args: 0,
            msg: 'Product price cannot be negative value!'
          }
        }
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'Product stock cannot be NULL!'
          },
          notEmpty: {
            args: true,
            msg: 'Product stock cannot be empty!'
          },
          isInt: {
            args: true,
            msg: 'Product stock must be integer!'
          },
          min: {
            args: 0,
            msg: 'Product stock cannot be negative value!'
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
    return queryInterface.dropTable('Products');
  }
};