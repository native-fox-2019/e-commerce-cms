'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')
  class User extends Model{}
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'Name can\'t be empty!'
        },
        notNull: {
          msg: 'Name can\'t be null!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'Email can\'t be empty!'
        },
        notNull: {
          msg: 'Email can\'t be null!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'Password can\'t be empty!'
        },
        notNull: {
          msg: 'Password can\'t be null!'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: {
          msg: 'Role can\'t be empty!'
        },
        notNull: {
          msg: 'Role can\'t be null!'
        }
      }
    }
  },
  {
    hooks: {
      beforeSave(user, options){
        if(user.role !== 'admin'){
          user.role = 'user'
        }
        return hash(user.password)
        .then(hashed => {
          user.password = hashed
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};