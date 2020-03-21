const models = require('../models');
const ToDo = models.ToDo;
const User = models.User;

module.exports = (req, res, next) => {
    let user = req.user;
    if (user.isAdmin) {
        next();
    } else {
        next({
            status: 403,
            message: "Forbidden"
        });
    }
};