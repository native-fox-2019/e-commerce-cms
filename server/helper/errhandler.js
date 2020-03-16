
function errorHandler(err,request,response,next){
    // console.log(err)clear
    if(err){
        // console.log('if')
        response.status(err.status).json({msg:err.msg})
    }
}

module.exports=errorHandler