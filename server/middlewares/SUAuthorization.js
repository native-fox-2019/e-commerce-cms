module.exports = (request, response, next) => {
    if (request.userData.superUser) {
        next()
    } else {
        next({
            status_code: 403,
            message: 'Unauthorized'
        })
    }
}