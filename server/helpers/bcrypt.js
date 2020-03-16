const bcrypt = require('bcrypt')
const saltRounds = 7

module.exports = {
    hashPass: async (password) => {
        return await bcrypt.hash(password, saltRounds)
    },
    comparePass: async (test, hashed) => {
        return await bcrypt.compare(test, hashed)
    }
}