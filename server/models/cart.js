'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    total: DataTypes.STRING
  }, {});
  Cart.associate = function(models) {
    // associations can be defined here
    Cart.belongsTo(models.Product, { foreignKey: 'product_id' })
    Cart.belongsTo(models.User, { foreignKey: 'user_id' })
  };
  return Cart;
};