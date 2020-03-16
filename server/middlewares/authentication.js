const {User} = require('../models');
const jwt = require('jsonwebtoken');

function authentication(req, res, next){
    let token = req.headers.token
    try{
        let decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        User.findOne({
            where: {
                id: req.user.id
            }
        })
        .then(data=>{
            next()
        })
        .catch(err=>{
            throw {
                msg: 'user not found',
                status: 404
            }
        })
    }catch(err){
        next(err)
    }
}

module.exports = authentication;