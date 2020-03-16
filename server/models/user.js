'use strict';
const { hashPass } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Username cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Username cannot be empty!'
        }
      }
    },
    email:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty!'
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty!'
        }
      }
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Role cannot be empty!'
        },
        isIn: {
          args: ['admin','user'],
          msg: 'Role must be either admin or user!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await hashPass(user.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};