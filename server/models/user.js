'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Email is empty'},
        notNull: {msg: 'Email is empty'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Password is empty'},
        notNull: {msg: 'Password is empty'}
      }
    },
    role: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Username is empty'},
        notNull: {msg: 'Username is empty'}
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options){
        return bcrypt.hash(instance.password, saltRounds)
          .then(function(hash){
            instance.password = hash;
          })
      }
    }
  });
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};