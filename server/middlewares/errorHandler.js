module.exports = (err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let msg = []
        err.errors.forEach(i => {
            msg.push(i.message)
        })
        res.status(400).json(msg)
    }

    if (err.name === 'SequelizeConnectionRefusedError') {
        res.status(500).json('Server Error')
    }
    
    res.status(err.status).json(err.msg)

}