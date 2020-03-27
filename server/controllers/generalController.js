const {sign} = require('../helpers/jwt')
const {checkPass} = require('../helpers/bcrypt')
const {User, Product} = require('../models')
class GeneralController {
    static register(req, res, next) {
        let { email, password, role } = req.body
        if(!role){
            role = 'User'
        }
        User.create({ email, password, role})
        .then(data =>{
            const {id,role } = data
            let access_token = sign({id, role})
            res.status(201).json({access_token})
        })
        .catch(err =>{
            next(err)
        })
    }
    
    static login (req,res,next){
        const {email, password} = req.body
        User.findOne({where:{email}})
        .then(data =>{
            if(data){
                if(checkPass(password, data)){
                    const {id,role} = data
            console.log('access_token','=============')
            let access_token = sign({id,role})
                    console.log(access_token,'=============')
                    res.status(200).json({access_token})
                } else {
                    next ({
                        status:404,
                        msg:'incorrect USERNAME/PASSWORD'
                    })
                }
            } else {
                next ({
                    status:404,
                    msg:'incorrect USERNAME/PASSWORD'
                })
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    
    static getAll (req,res,next){
        Product.findAll({order:[['id','asc']]})
        .then(data => res.status(200).json(data))
        .catch(err =>{
            console.log(err)
            next(err)
        })
    }

    static getOne (req,res,next){
        Product.findOne({where:{id:req.params.id}})
        .then(data => res.status(200).json(data))
        .catch(next)
    }
}

module.exports = GeneralController