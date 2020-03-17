/** @format */

"use strict";
const {generatePass} = require('../helper/passwordHelper')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}
  User.init(
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
        notEmpty: {
          args:true,
          msg: 'fist name can not be empty'
        }
      }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
        notEmpty: {
          args:true,
          msg: 'last name can not be empty'
        }
      }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
        isEmail: {
          args: true,
          msg: 'make sure you insert valid email address'
        },
        notEmpty: {
          args:true,
          msg: 'email can not be empty'
        }
      }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
        notEmpty: {
          args:true,
          msg: 'password can not be empty'
        }
      }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN
      }
    },
    {hooks: {
      beforeCreate(user, options) {
        const hassPass = generatePass(user.password)
        user.password = hassPass
      }
    },sequelize }
  );
  User.associate = function(models) {
    User.hasMany(models.Product);
  };
  return User;
};
