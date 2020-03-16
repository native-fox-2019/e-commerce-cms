"use strict"

const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const generatePass = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword, salt);
}

const comparePass = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
}

module.exports = {generatePass, comparePass}