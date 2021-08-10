'use strict';
const bcrypt = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Username cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Username cannot empty"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Email cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Email cannot empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Password cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Password cannot empty"
        }
      }
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Admin cannot null."
        },
        notEmpty: {
          args: true,
          msg: "Admin cannot empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user, option) {
        return user.password = bcrypt.hashing(user.password)
      }
    }, sequelize
  });


  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Transaction)
    User.hasMany(models.Product)
  };
  return User;
};