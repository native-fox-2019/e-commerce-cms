'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
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
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Product image URL cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Product image URL cannot be empty!'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
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
          args: 1,
          msg: 'Product price cannot be negative value!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
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
          args: 1,
          msg: 'Product stock cannot be negative value!'
        }
      }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};