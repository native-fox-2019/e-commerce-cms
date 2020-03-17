const { products } = require('../models')
module.exports = (req, res, next) => {

    let id = {
        where: {
            id: req.params.id
        }
    }
    products.findOne(id)
        .then(product => {
            if (product) {
                if (product.userId === req.payloadUser.data.id) {
                    next()
                } else {
                    res.status(401).json({ msg: "unauthorized" })
                }
            } else {
                res.status(404).json({ msg: "data is not found" })
            }
        }).catch(err => {
            res.status(500).json(err)
        })

}