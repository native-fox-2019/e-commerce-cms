function errorHandler(err, req, res, next) {
    let errMsg = {}
    if (err.name === 'SequelizeUniqueConstraintError') {
        errMsg.status = 400
        errMsg.message = 'Username / Email already registered!'
    } else if (err.name === 'SequelizeValidationError') {
        errMsg.status = 400
        errMsg.message = []
        err.errors.forEach(e => {
            errMsg.message.push(e.message)
        });
    } else if (err.name === 'BadRequestError' && err.message) {
        errMsg.status = 400
        errMsg.message = err.message
    } else if (err.name === 'BadRequestError') {
        errMsg.status = 400
        errMsg.message = 'Wrong input! Please try again.'
    } else if (err.name === 'NotFoundError' && err.message) {
        errMsg.status = 404
        errMsg.message = err.message
    } else if (err.name === 'NotFoundError') {
        errMsg.status = 404
        errMsg.message = 'Record not Found!'
    } else if (err.name === 'ForbiddenError') {
        errMsg.status = 403
        errMsg.message = 'You don\'t have access to this!'
    } else if (err.name === 'UnauthorizedError') {
        errMsg.status = 401
        errMsg.message = 'You must log in first!'
    } else if (err.name === 'JsonWebTokenError') {
        errMsg.status = 401
        errMsg.message = 'You must log in first!'
    } else if (err.name === 'SequelizeDatabaseError') {
        errMsg.status = 500
        errMsg.message = 'Internal Server Error'
    } else if (err.message) {
        errMsg.status = 500
        errMsg.message = err.message
    } else {
        errMsg.status = 500
        errMsg.message = 'Oops! Something went wrong! Please contact our Customer Support for help.'
    }
    res.status(errMsg.status).json(errMsg)
}

module.exports = errorHandler
