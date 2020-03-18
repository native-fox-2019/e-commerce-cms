'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  class Product extends Model{}
  Product.init({
    name: {
      type: Sequelize.STRING,
      validate: {notEmpty: true}
    },
    image_url: DataTypes.STRING,
    price: {
      type: Sequelize.INTEGER,
      validate: {notEmpty: true}
    },
    stock: {
      type: Sequelize.INTEGER,
      validate: {notEmpty: true}
    }
  }, {sequelize});
  Product.associate = function(models) {
    // associations can be defined here
    Product.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Product;
};