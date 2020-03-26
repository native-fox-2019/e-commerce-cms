function errorHandler (err, req, res, next) {
    if(err.msg === 'register error'){
        res.status(err.status).json({message: err.errors});
    }else if(err.msg === 'Wrong email/password'){
        res.status(err.status).json({message: err.msg});
    }else if(err.message === 'jwt must be provided'){
        res.status(401).json({message: err.message});
    }else if(err.msg === 'not authorized'){
        res.status(err.status).json({message: err.msg});
    }else if(err.msg === 'add error'){
        res.status(err.status).json({message: err.errors});
    }else if(err.msg === 'User not found'){
        res.status(err.status).json({message: err.msg});
    }else if(err.msg === 'You are not admin'){
        res.status(err.status).json({message: err.msg});
    }else{
        res.status(500);
    }

}

module.exports = errorHandler;