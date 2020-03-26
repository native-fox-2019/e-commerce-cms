'use strict';
const bcrypt = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.Sequelize.Model
  class users extends models { }

  users.init({
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        isEmail: {
          msg: 'Must be filled with email'
        }
    }
    
  },
    password: {
     type: DataTypes.STRING,
     allowNull:false,
     validate: {
      notEmpty: {
        msg: 'Password must be filled'
      }
  }
    },
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