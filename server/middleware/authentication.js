const jwt = require('jsonwebtoken')

function authentication(req, res, next){
    const {token} = req.headers
    try{
        let decoded = jwt.verify(token, 'aaa')
        req.userdata = decoded
        next()
    } catch (err) {
        res.send(err)
    }
}

module.exports = authentication