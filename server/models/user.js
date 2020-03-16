'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email cannot be empty'
          }
        }
    },
    password: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password cannot be empty'
          }
        }
    },
    role: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [['User', 'Admin']],
            msg: 'Role must be User or Admin'
          }
        }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};