'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  },
  {
    hooks: {
      beforeSave(user, options){
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