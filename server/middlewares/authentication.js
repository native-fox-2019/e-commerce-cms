const { verifyToken } = require('../helpers/jwt');

function authentication(req, res, next) {
    let { token } = req.headers;
    
}

module.exports = authentication;