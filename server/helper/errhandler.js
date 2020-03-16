
function errorHandler(err,request,response,next){
    console.log(err)
    if(err.name==='JsonWebTokenError'){
        response.status(403).json({msg:'invalid credential'})
    }
    if(err){
        // console.log('if')
        response.status(err.status).json({msg:err.msg})
    }
}

module.exports=errorHandler