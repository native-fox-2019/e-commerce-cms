const Router = require('express').Router()
const routerProduct = require('./route-product')

Router.get('/',(request,response)=>{
    response.json({msg:'hello its working'})
})

Router.use('/product',routerProduct)



module.exports = Router