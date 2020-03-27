/** @format */

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
          notEmpty: {
            args: true,
            msg: "name can not be empty"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "description can not be empty"
          }
        }
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "photo can not be empty"
          }
        }
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          notEmpty: {
            args: true,
            msg: "price can not be empty"
          }
        }
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
          notEmpty: {
            args: true,
            msg: "stock can not be empty"
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "category can not be empty"
          }
        }
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { sequelize }
  ),
    (Product.associate = function(models) {
      Product.belongsTo(models.User);
    });
  return Product;
};
