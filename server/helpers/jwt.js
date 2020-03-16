const jwt = require('jsonwebtoken');
module.exports = {
    generateToken: (payload) => {
        return jwt.sign(payload, process.env.SECRET);
    },
    verifyToken: (token) => {
        return jwt.compare(token, process.env.SECRET);
    }
}