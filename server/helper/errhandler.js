
function errorHandler(err,request,response,next){
    console.log(err)
    if(err){
        // console.log('if')
        response.status(err.status).json({msg:err.msg})
    }
}

module.exports=errorHandler