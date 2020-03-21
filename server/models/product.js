'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize= sequelize.Sequelize
  const Model = Sequelize.Model
  class Product extends Model{}

  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:'name cannot be empty'
        },
        notNull:{
          msg:'name cannot be empty'
        }
      }
    },
    image_url: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'image url cannot be empty'
        }
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:"Price cannot be negative value"
        },
        isNumeric: {
          msg:'Price must be number'
        },  
      }
    },
    stock: {type:DataTypes.INTEGER,
      allowNull:false,
      isNumeric: true,  
    validate:{
      min:{
        args:[1],
        msg:"Product's Stock(s) must be positive value"
      },
      isNumeric: {
        msg:'Stock(s) must be number'
      },  
    }}
  },{
    sequelize
  })


  // const Product = sequelize.define('Product', {
  // }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};