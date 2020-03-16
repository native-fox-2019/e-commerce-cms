function errorHandler(err, req, res, next){
    console.log(err)
    res.status(err.status).json(err)
}

module.exports = errorHandler