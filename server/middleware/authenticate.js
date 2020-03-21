const jwt = require(`../helpers/jwt`)
const createError = require(`../helpers/createErrors`)
const model = require(`../models`)

module.exports = (req, res, next) => {
    var { token } = req.headers

    try {
        req.user = jwt.verify(token)
    }
    catch (err) {
        next(err)
    }

    model.User.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(data => {
            if (data || (data && req.user.role === `admin`)) {
                next()
            } else {
                throw createError(404, `User does not exist`)
            }
        })
        .catch(next)
}