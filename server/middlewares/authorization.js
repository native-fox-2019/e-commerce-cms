const {User} = require('../models');

function authorization(req, res, next){

    User.findOne({
        where: {
            id: req.user.id
        }
    })
        .then(data=>{
            if(data.role === 'admin'){
                next();
            }else{
                throw {
                    msg: 'not authorized',
                    status: 403
                }
            }
        })
        .catch(err=>{
            next(err);
        })
}

module.exports = authorization;