'use strict';
const { hashingPassword } = require('../helpers/bycrpt')
const createErrors = require('http-errors')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'username cannot be empty' },
        notEmpty: { args: true, msg: 'username cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'email cannot be empty' },
        notEmpty: { args: true, msg: 'email cannot be empty' },
        isEmail: { args: true, msg: 'email invalid' },
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw createErrors('400', 'email is already in use')
              }
            })
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' },
        len: { args: [5], msg: 'Password must be at least 5 characters' }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashingPassword(user.password)
      }
    },
    sequelize
  })
  // const User = sequelize.define('User', {
  //   username: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   role: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.Product)
    // User.belongsToMany(models.Product, { through: models.Cart })
  };
  return User;
};