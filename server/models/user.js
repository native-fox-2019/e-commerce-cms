'use strict';
module.exports = (sequelize, DataTypes) => {
  const bcyrpt= require('bcrypt')
  const saltRound = 10
  const User = sequelize.define('User', {
    name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:'name cannot be empty'
        },
        len:{
          args:[3,25],
          msg:'name must be between 3 to 25 characters'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"email cannot be empty"
        },
        isEmail:{
          msg:'invalid email format'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        len:{
          args:[5,30],
          msg:"password must be 5 or more characters"
        }
      }
    },
    level: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"level user cannot be empty"
        }
      }
    }
  }, {sequelize, hooks:{
      beforeCreate(instance,options){
        return bcyrpt.hash(instance.password,saltRound)
        .then(hash=>{
          instance.password=hash
        })
      }
  }});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};