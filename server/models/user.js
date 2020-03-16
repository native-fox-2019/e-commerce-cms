'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email address already in use!' },
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' },
        isEmail: true
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'column cannot be empty' },
        notEmpty: { args: true, msg: 'column cannot be empty' },
        len: { args: [5], msg: 'Password must be at least 5 characters' }
      }
    }
  })
  // const User = sequelize.define('User', {
  //   username: DataTypes.STRING,
  //   email: DataTypes.STRING,
  //   role: DataTypes.STRING,
  //   password: DataTypes.STRING
  // }, {});
  User.associate = function (models) {
    // associations can be defined here
    // User.hasMany(models.Product)
    User.belongsToMany(models.Product, { through: models.Cart })
  };
  return User;
};