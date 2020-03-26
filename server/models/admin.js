'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model
  const bcrypt = require('bcrypt')

  class Admin extends Model{}
  Model.init(
    {
    name: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your email!'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your password!'
        }
      }
    },
    roles : DataTypes.STRING
  }, {sequelize,tableName : 'Admins', hooks:{
        beforeCreate : (instance,options)=>{
          return bcrypt.hash(instance.password, 10)
          .then(function(hash) {
          instance.password = hash
          })
        }
      }}

  )
  
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};