const jwt = require('jsonwebtoken');


function jwtSign(data){
    console.log("ini data di jwt",data)
    console.log("ini obj data di jwt",{data})
    return jwt.sign({data}, process.env.SECRET);
}

function jwtVerify(token){
    return jwt.verify(token, process.env.SECRET);
}

module.exports={
    jwtSign,
    jwtVerify
}