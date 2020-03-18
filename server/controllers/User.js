const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { compare  }= require('../helpers/bcrypt')
class UserController {

  static register(req, res, next){
    let {name, email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if(data){
          res.type('application/json')
          res.status(401).json({message: "Email already registered!"})
        }else{
          return User.create({
            name,
            email,
            password,
            role: 'user'
          })
        }
      })
      .then(newUser => {
        res.type('application/json')
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next){
    let { email, password } = req.body
    let data = {}
    User.findOne({
      where: {
        email
      }
    })
    .then(found => {
      if(found){
        data = found
        return compare(password, found.password)
      }else{
        res.type('application/json')
        res.status(401).json({ message: "Wrong email or password!" })
      }
    })
    .then(result => {
      if(result){
        let token = jwt.sign({
          user_id: data.id,
          name: data.name,
          email: data.email
        }, process.env.SECRET)
        res.type('application/json')
        res.status(200).json({messgae: "Login succes!", usertoken: token})
      }else{
        res.type('application/json')
        res.status(401).json({ message: "Wrong email or password!" })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}
module.exports = UserController