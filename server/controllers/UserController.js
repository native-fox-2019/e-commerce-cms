const { User } = require('../models');
const createError = require('../helpers/createError');

class UserController {
    static async register (req, res, next) {
        try {
            let { email, password, role } = req.body;
            let obj = { email, password, role };
            let person = await User.findOne({ where: { email } })
            if (person) {
                throw createError(400, 'Email has already been registered');
            } else {
                let created = await User.create(obj)
                res.status(201).json(created);
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;