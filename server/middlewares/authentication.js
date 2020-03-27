const jwt = require('jsonwebtoken')

module.exports = (err, res, next) => {
  const token = res.headers.usertoken
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {      
      err = {
        status: 403,
        message: 'Token has been expired',
      }
      next(err)
    }else{
      req.user = decoded
      next()
    }
  });
}