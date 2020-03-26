const { Product } = require('../models/index')
function authorization (req, res, next){
    Product.findOne({
        where: {id: req.params.id}
    })
    .then(data=>{
        if(data.userId === req.userdata.id)
        next()
        else {
            res.send('not authorized')
        }
    })
    .catch(e => res.status(404).json({"status": 404, "response": "data not found"}))
}

module.exports = authorization