const Router = require('express').Router()
const routerProduct = require('./route-product')
const routerUser = require('./route-user')

Router.get('/home',(request,response)=>{
    response.json({msg:'hello its working'})
})

Router.use('/product',routerProduct)
Router.use('/user',routerUser)



module.exports = Router