'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Name cannot be empty' },
        notNull : { msg: 'Name cannot be empty' }
      }
    },
    role: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Email cannot be empty' },
        notNull : { msg: 'Email cannot be empty' }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : { msg: 'Password cannot be empty' },
        notNull : { msg: 'Password cannot be empty' }
      }
    }
  }, {hooks : {
    beforeCreate(instance, options){
      return bcrypt.hash(instance.password, saltRounds)
      .then(function(hash) {
        instance.password = hash
    });
    }
  }});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};