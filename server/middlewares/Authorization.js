const {
    Product
} = require('../models')

module.exports = (request, response, next) => {
    Product.findByPk(request.params.id)
        .then(result => {
            if (result) {
                if (result.user_id == request.userData.id) {
                    next()
                } else {
                    throw {
                        status_code: 400,
                        message: 'Unauthorized'
                    }
                }
            } else {
                throw {
                    status_code: 404,
                    message: 'Data Not Found'
                }
            }
        })
        .catch(err => {
            next(err)
        })
}