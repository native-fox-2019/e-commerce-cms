module.exports = function errorHandler(err,req,res,next){
    if(err.name === 'SequelizeValidationError'){
        let err = {status:400, msg:[]}
        err.errors.map(el => err.msg.push(el.message))
        res.status(400).json({msg})
    } else if(err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json(err.errors[0].message)
    } else {
        console.log('ini res send')
        res.send(err)
    }
}