function errorHandler (err, req, res, next) {
    if(err.msg === 'register error'){
        res.status(err.status).json({message: err.errors});
    }else{
        res.status(500)
    }

}

module.exports = errorHandler;