'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Name is empty'},
        notNull: {msg: 'Name is empty'}
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Image url is empty'},
        notNull: {msg: 'Image url is empty'}
      }
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Price is empty'},
        notNull: {msg: 'Price is empty'}
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Stock is empty'},
        notNull: {msg: 'Stock is empty'}
      }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};