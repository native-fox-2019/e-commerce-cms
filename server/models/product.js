'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Name cannot be empty' },
        notNull : { msg: 'Name cannot be empty' }
      }
    },
    image_url: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Image url cannot be empty' },
        notNull : { msg: 'Image url cannot be empty' }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        min : 0,
        notEmpty : { msg: 'Price cannot be empty' },
        notNull : { msg: 'Price cannot be empty' }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        min : 0,
        notEmpty : { msg: 'Stock cannot be empty' },
        notNull : { msg: 'Stock cannot be empty' }
      }
    }
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.User, { through : 'Cart'})
  };
  return Product;
};