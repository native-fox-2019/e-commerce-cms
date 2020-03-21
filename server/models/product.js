'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};