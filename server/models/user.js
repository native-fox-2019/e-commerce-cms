'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : true,
        notNull : true
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};