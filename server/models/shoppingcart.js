'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShoppingCart = sequelize.define('ShoppingCart', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
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
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
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
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
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
          msg: 'Quantity value must be at least 1!'
        }
      }
    }
  }, {});
  ShoppingCart.associate = function(models) {
    // associations can be defined here
    ShoppingCart.belongsTo(models.User);
    ShoppingCart.belongsTo(models.Product);
  };
  return ShoppingCart;
};