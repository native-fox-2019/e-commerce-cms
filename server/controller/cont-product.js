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
        // console.log(request.params.id)
        
        Product.findOne({where:{id:request.params.id}})
        .then(data=>{
            // console.log(data)
            if(data){
                return Product.update({
                    name:request.body.name,
                    image_url:request.body.image_url,
                    price:request.body.price,
                    stock:request.body.stock
                    },{where:{id:request.params.id}})
            }else{
                // console.log('masuk ga ada')
                //data ga ada
                let error={
                    status:404,msg:"data not found"
                }
                throw (error)
            }
        })
        .then(res=>{
            if(res){
                let obj={
                    msg:'Succes update data',
                    data:{
                        id:request.params.id,
                        name:request.body.name,
                        image_url:request.body.image_url,
                        price:request.body.price,
                        stock:request.body.stock
                    }
                }
                response.json(obj)
            }
        })
        .catch(err=>{
            // console.log(err,'============================ ini error')
            if(err.status===404){
                // console.log('masuk sini')
                let errobj={
                    status:404,
                    msg:err.msg
                }
                next(errobj)
            }
            else{
                if (err.errors){
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
                    // console.log('masuk ga ada error')
                    next({status:500,msg:'internal server error'})
                }
            }
        })
    }

    static delete(request,response,next){
        // console.log(request.params.id)
        let datum = null
        Product.findOne({where:{id:request.params.id}})
        .then(data=>{

            if(data){
                datum=data
                return Product.destroy({where:{id:request.params.id}})
            }else{  
                let errobj = {
                    status:404,msg:"data not found"
                }
                throw(errobj)
            }
        })
        .then(data=>{
            // console.log('ada data=======================')
            response.send({
                msg:'succesfully delete data',
                name:datum.name,
                image_url:datum.image_url,
                price:datum.price,
                stock:datum.stock
            })
        })
        .catch(err=>{
            if(err.status==404){
                next(err)
            }else{
                next({
                    status:500,
                    msg:"internal server error"
                })
            }
        })
    }
    static findById(request,response,next){
        Product.findOne({where:{id:request.params.id}})
        .then(data=>{
            if (data){
                response.json(data)
            }else{
                throw ({status:404,msg:"Data not found"})
            }
        })
        .catch(err=>{
            if(err.status){
                next(err)
            }else{
                next({status:500,msg:'internal server error'})
            }
        })
    }


}

module.exports = Controller
