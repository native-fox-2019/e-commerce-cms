'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }},
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }},
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true
      }},
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }},
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true
      }},
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true
      }}
  }, {sequelize});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};