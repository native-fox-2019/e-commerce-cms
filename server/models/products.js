'use strict';
const changeToCurrency = require('../helpers/changeToCurrency')
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name of products cant be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'price cant be a negative'
        },
        notEmpty: {
          msg: 'price of products cant be empty',
        },
      }
    },
    stocks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: 'stocks cant be a negative'
        },
        notEmpty: {
          msg: 'stocks of products cant be empty'
        },
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'imageURL of products cant be empty'
        }
      }
    }
  }, {
    hooks: {
      // afterFind: (instances, option) => {
      //   instances.forEach( el => {
      //   el.price =`Rp. ${new Intl.NumberFormat(['ban', 'id']).format(el.price)}`
      //   })
      // }
    }, sequelize
  });
  Products.associate = function (models) {
    // associations can be defined here
  };
  return Products;
};