'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Transaction extends Model { }

  Transaction.init({
    UserId: DataTypes.INTEGER,
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "ProductId cannot null.",
        },
        notEmpty: {
          args: true,
          msg: "ProductId cannot empty."
        }
      }
    }
  }, { sequelize });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
    // associations can be defined here
  };
  return Transaction;
};