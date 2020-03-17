const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
  hash: function(password){
    return bcrypt.hash(password, saltRounds)
  },
  compare: function(password, hashed){
    return bcrypt.compare(password, hashed)
  }
}