'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Cart extends Model { }
  Cart.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER
  }, { sequelize })

  // const Cart = sequelize.define('Cart', {
  //   ProductId: DataTypes.INTEGER,
  //   UserId: DataTypes.INTEGER,
  //   qty: DataTypes.INTEGER
  // }, {});
  Cart.associate = function (models) {
    // associations can be defined here
    // Cart.belongsTo(models.User)
    // Cart.belongsTo(models.Product)
  };
  return Cart;
};