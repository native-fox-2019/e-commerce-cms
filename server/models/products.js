'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = sequelize.Sequelize.Model
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name of products cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'price cant be a negative'
        },
        notEmpty: {
          msg: 'price of products cant be empty',
        },
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'stocks cant be a negative'
        },
        notEmpty: {
          msg: 'stocks of products cant be empty'
        },
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageURL of products cant be empty'
        }
      }
    }
  }, {
    sequelize
  });
  Product.associate = function (models) {
    // associations can be defined here
    Product.hasMany(models.Cart)
  };
  return Product;
};