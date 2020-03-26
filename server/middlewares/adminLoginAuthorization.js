const {User} = require('../models');

function adminAuthorization(req, res, next){
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(data=>{
            if(data.role !== 'admin'){
                throw {
                    msg: 'You are not admin',
                    status: 403
                }
            }else{
                next()
            }
        })
        .catch(err=>{
            console.log(err)
            next(err)
        })
}

module.exports = adminAuthorization;