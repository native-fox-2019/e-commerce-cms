function errorHandler (err, req, res, next) {
    if (err.name === 'SequelizeValidationError') {
        let msg = [];
        err.errors.forEach(x => {
            msg.push(x.message);
        });
        res.status(400).json({
            status: 400,
            msg
        })
    } else if (err.name === 'BadRequestError') {
        res.status(400).json({
            status: 400,
            msg: err.message
        })
    } else if (err.name === 'NotFoundError') {
        res.status(404).json({
            status: 404,
            msg: err.message
        })
    } else if (err.name === 'JsonWebTokenError') {
        res.status(403).json({
            status: 403,
            msg: 'You are forbidden to do that'
        })
    }
    else {
        console.log(err);
        res.status(500).json({
            status: 500,
            msg: 'Internal Server Error'
        })
    }
}

module.exports = errorHandler;