const bcrypt = require('bcrypt')
const salt = 10

function hashPass(obj){
    return bcrypt.hashSync(obj.password, salt)
}

function checkPass(password,data){
    return bcrypt.compareSync(password, data.password)
}

module.exports = { hashPass, checkPass }