const jwt = require('jsonwebtoken')

function authentication(req, res, next) {
    // console.log('authentication')
    let access_token = req.headers.access_token
    try {
        let data = jwt.verify(access_token, process.env.SECRET)
        req.userData = data
        next()
    } catch (err) {
        next({
            status : 401
        })
    }
}

module.exports = authentication