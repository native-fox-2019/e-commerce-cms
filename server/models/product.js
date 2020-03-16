'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Name cannot be empty'
          }
        }
    },
    image_url: DataTypes.INTEGER,
    price: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Price cannot be empty'
          }
        }
    },
    stock: {
      type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Stock cannot be empty'
          }
        }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};