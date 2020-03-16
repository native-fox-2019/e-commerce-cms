'use strict';
const {encrypt} = require('../helpers/passwordBcrypt') 
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email must unique'
      },
      validate:{
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: true,
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      validate:{
        notEmpty: true,
      }}
  }, {
    hooks: {
      beforeCreate(user, options) {
        user.password = encrypt(user.password)
      }
    },
    sequelize});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};