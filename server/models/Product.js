"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `Product Name can't be empty!`
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `Image url can't be empty!`
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: `Price must be at least 1`
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: 1,
            msg: `Stock must be at least 1`
          }
        }
      }
    },
    {}
  );
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User);
  };
  return Product;
};
