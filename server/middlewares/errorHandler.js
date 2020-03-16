function errorHandler(err, req, res, next){
    console.log(err)
    if(err.name = 'SequelizeValidationError'){
        res.status(400).json({message : err})
    } else {
        res.status(500)
    }
}

module.exports = errorHandler