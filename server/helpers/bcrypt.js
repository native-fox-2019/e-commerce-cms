const bcrypt = require('bcrypt')
const salt = 10

function hashPass(obj){
    return bcrypt.hashSync(obj.password, salt)
}

function checkPass(obj,data){
    return bcrypt.compareSync(obj.password, data.password)
}

module.exports = { hashPass, checkPass }