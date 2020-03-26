'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    total: DataTypes.INTEGER
  }, {});
  Cart.associate = function(models) {
  };
  return Cart;
};