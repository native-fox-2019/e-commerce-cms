const { Task } = require('../models')

function authorizationUser(req, res, next) {
    let id = req.params.id
    Task.findOne({
        where: {
            id: id
        }
    })
    .then(data=>{
        if(!data){
            throw new Error({msg:`product not found`})
        }else{
        if(data.userId === req.userData.id){
            next()
        }else{
            throw new Error("User not authorized")
        }
    }
    })
    .catch((err) => {
        res.status(400).json({
            status: 400,
            message: err.message
        })
    })
}

module.exports = authorizationUser