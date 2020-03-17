module.exports = (req, res, next) =>{
  const { User } = require('../models')
    User
      .findOne({
          where:{
              id: req.user
          }
      })
      .then(data => {        
        if (!data) {   
          throw {status: 404, message: 'Data Not Found'}
        } else {
          if (data.admin === true) {
            next()
          } else {
          throw {status: 401, message: 'Unauthorize'}
          }
        }
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
}