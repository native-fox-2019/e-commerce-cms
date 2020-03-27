'use strict';

const {hashPass} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = sequelize.Sequelize.Model
  class User extends Model { }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already used'
      },
      validate: {
        notEmpty: {
          msg: 'email cant be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cant be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'role cant be empty'
        }
      }
    },
  }, { hooks: {
    beforeSave: (instance,option) => {
    instance.password = hashPass(instance.password)
  }}, sequelize });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Cart)
  };
  return User;
};