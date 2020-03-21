'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Banner extends Model { }

  Banner.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Title cannot be null.'
        },
        notEmpty: {
          args: true,
          msg: 'Title cannot empty.'
        }
      }
    },
    urlImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'url image cannot be null.'
        },
        notEmpty: {
          args: true,
          msg: 'url image cannot empty.'
        }
      }
    }
  }, { sequelize });

  Banner.associate = function (models) {
    // associations can be defined here
  };
  return Banner;
};