'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image url cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        }
      }
    }
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Cart, { foreignKey:'product_id' })
    Product.belongsToMany(models.User, { through: models.Cart, foreignKey: 'product_id' })
  };
  return Product;
};