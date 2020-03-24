const {User} = require('../models')

function authorization(req, res, next){
    User.findOne({where: {email: req.userData.email}})
    .then(user => {
        if(user.role === 'admin'){
            next()
        }else{
            throw ({status: 403, msg: 'Not Authorized'})
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization