'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    image_url: DataTypes.STRING,
    price:{ 
      type: DataTypes.DECIMAL,
      validate: {
        isPositive(value){
          if(value<0){
            throw new Error("price cant be negative");
          } else if (value === 0) {
            throw new Error("price cant be zero");
          }
        }
      }
    },
    stock: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};