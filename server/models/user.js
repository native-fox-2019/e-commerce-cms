'use strict';
const {hashPassword} = require('../helpers/bcryptjs.js')

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class User extends Model {}

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an username!'
        },
        validUsername(value) {
          let regex =  RegExp('(?=.{3,})')
          if (!regex.test(value)) {
            throw new Error("Username needs to have at least 3 characters long!");
          }
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert an email address!'
        },
        isEmail: {
          msg: 'The email is not in the right format!'
        },
        // isUnique(value, next) {
        //   User.findAll({where: { email: value }})
        //   .then(function (user) {
        //     console.log(user)
        //     if (user) throw new Error('Email address already in use!')
        //   })
        //   .catch(err => next(err))
        // }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please insert a password'
        },
        validPassword(value) {
          let regex =  RegExp('(?=.{8,})')
          if (!regex.test(value)) {
            throw new Error("Password needs to have at least 8 characters!");
          }
        },
      }
    },
    role: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        let inputPass = instance.password
        instance.password = hashPassword(inputPass)
      }
    },
    sequelize,
    timestamps: false,
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Item)
    User.hasMany(models.Cart)
  };
  return User;
};