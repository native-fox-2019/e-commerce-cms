'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Admin extends Model{}
  Model.init(
    {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {sequelize,tableName : 'Admins'}
  )
  
  Admin.associate = function(models) {
    // associations can be defined here
  };
  return Admin;
};