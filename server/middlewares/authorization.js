const {Cart, Item, User} = require('../models')

function authorization(req, res, next) {
    let id = req.params.id
    let option = {
        where: { id: id }
    }
    Task.findOne(option)
    .then(task => {
        if (!task) throw {status: 404, message: 'Data not found!'}
        if (task.UserId !== req.userData.id) throw {status: 400, message: `You're not authorized!`}
        next()
    })
    .catch(next)
}

module.exports = authorization