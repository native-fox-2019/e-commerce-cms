'use strict';
const Bcrypt = require('../helpers/bcrypt.js')
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  User.addHook('beforeCreate', (user)=>{
    user.password = Bcrypt.hash(user.password);
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};