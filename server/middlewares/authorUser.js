const {Cart} = require('../models')

module.exports = function authorization (req,res,next) {
    Cart.findOne({where:{id:req.user.id}})
    .then(data => {
        if(data){
            if(data.UserId === req.params.id) {
                next()
            } else {
                next({
                    status:403,
                    message: 'you cant execute this action'
                })
            }
        } else {
            next({
                status:404,
                message: 'Your Product cant be found'
            })
        }
    })
    .catch(next)
}