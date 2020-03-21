'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}

  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email Column Cannot Empty'
        }
      }
    },
    is_admin: DataTypes.BOOLEAN,
    superUser: DataTypes.BOOLEAN,
    password: {
      type: DataTypes.STRING,
      validate: {
        pasLength: (password) => {
          if (password.length <= 5) {
            throw new Error('Password Length Minimum 6 Characters')
          }
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, option) => {
        return bcrypt.hash(instance.password, 10).then(result => {
            instance.password = result
          })
          .catch(err => {
            console.log('Error Hashing Password')
          })
      }
    },
    sequelize
  })

  User.associate = function (models) {
    User.hasMany(models.Product, {
      foreignKey: 'user_id'
    })
  };
  return User;
};