"use strict";
const { hashed } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}

  User.init(
    {
      image: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true
        }
      }
    },
    {
      hooks: {
        beforeSave(instance, options) {
          instance.password = hashed(instance.password);
        }
      },
      sequelize
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Campaign);
    User.hasMany(models.Product);
  };
  return User;
};
