module.exports = function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        let msg = []
        err.errors.map(el => msg.push(el.message))
        res.status(400).json({ msg })
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ msg: err.errors[0].message })
    } else if (err.msg === 'incorrect USERNAME/PASSWORD') {
        res.status(404).json(err)
    } else {
        console.log('ini res send')
        // res.send(err)
    }
}