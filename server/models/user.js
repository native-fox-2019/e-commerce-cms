'use strict';
const { hash } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name can not be empty" },
        notEmpty: { msg: "Name can not be empty" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email can not be empty" },
        notEmpty: { msg: "Email can not be empty" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password can not be empty" },
        notEmpty: { msg: "Password can not be empty" }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (instance, options) => {
        instance.password = await hash(instance.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};