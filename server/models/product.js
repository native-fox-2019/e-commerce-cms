"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Product extends Model {}

  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      image_url: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          notNull: true,
          min: 0
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          isInt: true,
          notNull: true,
          min: 0
        }
      }
    },
    { sequelize }
  );
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};
