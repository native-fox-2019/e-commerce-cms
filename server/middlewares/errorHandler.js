function errorHandler(err, req, res, next){
    if(err.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({message : `Your email has been registered`})
    } else if(err.status === 400){
        res.status(err.status).json({message : err.error})
    } else if(err.status === 401){
        res.status(err.status).json({message : `Invalid Token`})
    } else if(err.status === 403){
        res.status(err.status).json({message : `Forbidden`})
    } else if(err.status === 404){
        res.status(err.status).json({message : `Not Found`})
    }else {
        res.status(500)
    }
}

module.exports = errorHandler