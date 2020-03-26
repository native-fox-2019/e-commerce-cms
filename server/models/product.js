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
        notEmpty: true,
        isInt: true
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
        notEmpty: true,
        isInt: true,
        min: 1,
      }},
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        isInt: true,
        min: 1,
      }},
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: true
      }}
  }, {sequelize});
  Product.associate = function (models) {
    Product.belongsTo(models.Category)
    Product.hasMany(models.Cart)
    // associations can be defined here
  };
  return Product;
};