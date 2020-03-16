const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    hash: async (password) => {
        return await bcrypt.hash(password, saltRounds);
    },
    compare: async (hashed) => {
        return await bcrypt.compare(password, saltRounds);
    }
}