const bcrypt = require('bcrypt');
const saltRounds = 10;

function hasher(password){
    return bcrypt.hashSync(password, saltRounds);
}

function checker(password,hash){
    return bcrypt.compareSync(password, hash);
}

module.exports={
    hasher,
    checker
}