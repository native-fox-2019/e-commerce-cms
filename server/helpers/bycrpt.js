const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

const hashingPassword = password => {
  return bcrypt.hashSync(password, salt)
}

const verifyingPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

module.exports = { hashingPassword, verifyingPassword }