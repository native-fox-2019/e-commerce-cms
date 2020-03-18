'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Category extends Model { }

  Category.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notNull: { args: true, msg: 'column cannot be empty' },
      notEmpty: { args: true, msg: 'column cannot be empty' },
    }
  }, { sequelize })

  // const Category = sequelize.define('Category', {
  //   name: DataTypes.STRING
  // }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};