'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Transaction extends Model { }
  
  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
  }, {sequelize});
  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};