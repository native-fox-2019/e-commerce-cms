'use strict';
const { Product } = require('../models')

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
    },
    quantity: {
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
  }, {
    // hooks: {
    //   beforeUpdate(data, option) {
    //     Product
    //       .findOne({
    //         where: {
    //           id: data.ProductId
    //         }
    //       })
    //       .then(result => {
    //         if (result.stock < data.quantity) {
    //           throw {
    //             status: 400,
    //             msg: "Not enough stock."
    //           }
    //         }
    //       })
    //       .catch(err => {
    //         next(err)
    //       })
    //   }
    //   },
    sequelize
  });

  Transaction.associate = function (models) {
    Transaction.belongsTo(models.User)
    Transaction.belongsTo(models.Product)
    // associations can be defined here
  };
  return Transaction;
};