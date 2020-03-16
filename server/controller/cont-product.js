const { Product } = require('../models')

class Controller {
    static create (request,response,next){
        let err={
            status:400,
            msg:[]
        }
        if (!request.body.name||request.body.name===''){
            err.msg.push('Product Name cannot be empty')
        }
        if(!request.body.image_url||request.body.image_url===''){
            err.msg.push('Image Url cannot be empty')
        }
        if (request.body.price<0){
            err.msg.push('Price cannot be negative value')
        }
        if(request.body.stock<=0){
            err.msg.push("Product's Stock cannot be empty")
        }
        if (err.msg.length>0){
            response.status(400).json({msg:err.msg})
        }else{
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
                console.log(err)
                response.json(err)
            })
        }

    }
}

module.exports = Controller
