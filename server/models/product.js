'use strict';
const convertCurreny = require('../helpers/currency')

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image url cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: (ins, opt) => {
        ins.price = convertCurreny(ins.price)
      }
    }
  });
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};