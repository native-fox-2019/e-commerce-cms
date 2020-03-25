'use strict';

const { encode } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: async (ins, opt) => {
        try {
          const hashed = await encode(ins.password)
          ins.password = hashed
          if (!ins.role) {
            ins.role = `user`
          }
        } catch (error) {
          
        }
      }
    }
  });
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Cart, { foreignKey: 'user_id' })
    User.belongsToMany(models.Product, { through: models.Cart, foreignKey: 'user_id' })
  };
  return User;
};