'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Product extends Model { }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column name cannot be empty' },
        notEmpty: { args: true, msg: 'column name cannot empty' }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column image cannot be empty' },
        notEmpty: { args: true, msg: 'column image cannot be empty' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column price cannot be empty' },
        notEmpty: { args: true, msg: 'column price cannot be empty' },
        min: 0
      }
    },
    stock: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column stock cannot be empty' },
        notEmpty: { args: true, msg: 'column stock cannot be empty' },
        min: 0
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, { sequelize })



  // const Product = sequelize.define('Product', {
  //   name: DataTypes.STRING,
  //   image_url: DataTypes.STRING,
  //   price: DataTypes.INTEGER,
  //   stock: DataTypes.STRING,
  //   UserId: DataTypes.INTEGER
  // }, {});
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.Category)
    // Product.hasMany(models.User)
    // Product.belongsToMany(models.User, { through: models.Cart })
  };
  return Product;
};