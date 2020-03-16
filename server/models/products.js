'use strict';
const changeToCurrency = require('../helpers/changeToCurrency')
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name of products cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        notEmpty: {
          msg: 'price of products cant be empty',
        },
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        notEmpty: {
          msg: 'stocks of products cant be empty'
        },
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageURL of products cant be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeSave: (instance, option) => {
        instance.price = changeToCurrency(instance.price)
      }
    }, sequelize
  });
  Products.associate = function (models) {
    // associations can be defined here
  };
  return Products;
};