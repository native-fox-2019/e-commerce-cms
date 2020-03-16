const { Product, Admin } = require('../models/index.js')


class adminController{

    static register(req,res){
        const obj = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        Admin.create(obj)
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            res.status(501).json(err)
        })
    }

}

module.exports = adminController