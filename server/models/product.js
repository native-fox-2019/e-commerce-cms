'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model=sequelize.Sequelize.Model;

  class Product extends Model{

  }

  Product.init({
    name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {sequelize,modelName:'Product'})


  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};