const { User } = require('../models')

module.exports = function authorization(req, res, next) {
    const { id } = req.user
    User.findOne({ where: { id } })
        .then(data => {
            console.log(data.role)
            if (data.role === 'Admin') {
                next()
            } else {
                console.log('lolos author')
                throw {
                    status: 401,
                    msg: 'Invalid Token'
                }
            }
        })
        .catch(err => {
            next(err)
        })
}