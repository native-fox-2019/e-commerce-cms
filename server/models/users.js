'use strict';
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model
  class users extends models { }

  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize, hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hasher(user.password)
      }
    }
  })

  users.associate = function (models) {
    users.hasMany(models.products)
    // associations can be defined here
  };
  return users;
};