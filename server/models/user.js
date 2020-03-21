'use strict';
const {encrypt} = require('../helpers/passwordBcrypt') 
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          notEmpty: true
        }
      }
    },
    {
      hooks: {
        beforeCreate(user, options) {
          user.password = encrypt(user.password);
        }
      },
      sequelize
    }
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart)
  };
  return User;
};