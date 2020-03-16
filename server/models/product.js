'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Product extends Model{}

  Product.init(
    {
    name: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter the name!'
        }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter the url!'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      validate: {
        min : 0,
        notEmpty: {
          msg: 'Insert the price and it should more than 0!'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min : 0,
        notEmpty: {
          msg: 'Insert the stock and it should more than 0!'
        }
      }
    }
  }, {sequelize, tableName:'Products'}
  )
 
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};