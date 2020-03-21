const bcrypt = require('bcrypt')
const saltRounds = 7

module.exports = {
    hashPass: async (password) => {
        return await bcrypt.hash(password, saltRounds)
    },
    seedHash: (password) => {
        return bcrypt.hashSync(password, saltRounds)
    },
    comparePass: async (test, hashed) => {
        return await bcrypt.compare(test, hashed)
    }
}