'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Product extends Model { }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Product Name cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Product Name cannot empty"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Stock cannot empty"
        },
      }
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Url Image cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Url Image cannot empty"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Price cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Price cannot empty"
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "UserId cannot null."
        },
        notEmpty: {
          args: true,
          msg: "UserId cannot empty"
        },
      }
    },
  }, { sequelize });

  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.User)
    Product.hasMany(models.Transaction)
  };
  return Product;
};