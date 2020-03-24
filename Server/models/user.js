'use strict';
module.exports = (sequelize, DataTypes) => {

  const bcrypt = require('bcrypt')
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model

  class User extends Model{}

  User.init({
    name: {
      type :DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please input your email'
        },
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
      sequelize,
      hooks: {
        beforeSave(instance, options) {
          return bcrypt.hash(instance.password, 8)
          .then(function(hash) {
            // Store hash in your password DB.
            instance.password = hash
          });
        }
      }
    }
  )

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};