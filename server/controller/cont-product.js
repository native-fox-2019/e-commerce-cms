const { Product } = require('../models')

class Controller {
    static create (request,response,next){
            Product.create({
                name:request.body.name,
                image_url:request.body.image_url,
                price:request.body.price,
                stock:request.body.stock
            })
            .then(data=>{
                response.json(data)
            })
            .catch(err=>{
            
                if(err.errors){
                    let errorObj={
                        status:400,
                        msg:[],
                        type:err.errors[0].type
                    }
                    
                    for (let i = 0 ; i < err.errors.length ; i++){
                        errorObj.msg.push(err.errors[i].message)
                    }
                    next(errorObj)
                }else{
                    next({status:500,msg:'internal server error'})
                }
                // response.json(err)
            })
        

    }
    static readProduct(request,response,next){
        Product.findAll()
        .then(result=>{
            response.send(result)
        })
        .catch(err=>{
            next({status:500,msg:'internal server error'})
        })
    }

    static update(request,response,next){
        
        Product.findByPk(Number(request.params.id))
        .then(data=>{
            if(data){
                Product.update({
                    name:request.body.name,
                    image_url:request.body.image_url,
                    price:request.body.price,
                    stock:request.body.stock
                },{where:{id:request.params.id}})
            }else{
                //data ga ada
                
            }
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller
