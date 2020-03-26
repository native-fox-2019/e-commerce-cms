const bcrypt = require('bcrypt')
const salt = 10

const encode = async (password) => {
    try{
        const hashed = await bcrypt.hash(password, salt)
        return hashed
    } catch (error) {

    }
}

const decode = async (password, hashed) => {
    try {
        const match = await bcrypt.compare(password, hashed)
        return match
    } catch (error) {
        
    }
}

module.exports = {
    encode,
    decode
}