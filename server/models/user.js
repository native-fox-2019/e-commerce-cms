"use strict";
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require(`../helpers/bcrypt`);
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          notEmpty: {
            msg: `Email can't be empty`
          },
          isEmail: {
            msg: `Invalid email format!`
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `Password can't be empty`
          },
          len: {
            args: [6],
            msg: `Password must be at least 6 characters long`
          }
        }
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: `Role can't be empty`
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          instance.password = bcrypt.hashing(instance.password);
        }
      }
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
