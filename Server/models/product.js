'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class Product extends Model {}

  Product.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input the name of products'
        }
      }
    },
    image_url: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      validate: {
        min: 
        {
          args: [0],
          msg: 'price must be >= 0'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        min: 
        {
          args: [0],
          msg: 'stock must be >= 0'
        }
      }
    }
  }, {sequelize})

  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};