const jwt = require('../helpers/jwt.js');
const models = require('../models');
const User = models.User;

module.exports = (req, res, next) => {
    let decodedToken;
    try {
        const token = req.headers.authorization;
        decodedToken = jwt.verify(token);
        req.user = decodedToken;
        next();
    } catch(err) {
        next ({
            status: 401,
            message: "Unauthorized"
        });
        return;
    }
};