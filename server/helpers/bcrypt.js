const bcrypt = require('bcrypt')

function hashing(password) {
  return bcrypt.hashSync(password, 10)
}

function compare(password, passwordDB) {
  return bcrypt.compareSync(password, passwordDB)
}

module.exports = {
  hashing,
  compare
}