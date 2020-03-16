const bcrypt = require('bcrypt')
const salt = 10

function hashPass(password){
    return bcrypt.hashSync(password, salt)
}

function checkPass(password,data){
    return bcrypt.compareSync(password, data.password)
}

module.exports = { hashPass, checkPass }