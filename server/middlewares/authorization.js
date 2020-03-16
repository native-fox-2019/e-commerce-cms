const Model = require('../models')
const User = Model.User

function authorization(req, res, next){
    let data = req.userData
    User.findOne({where : {id : data.id}})
    .then(data =>{
        if(data.role === 'admin'){
            next()
        } else {
            next({
                status : 403
            })
        }
    })
}

module.exports = authorization