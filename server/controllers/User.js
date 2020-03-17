const { User } = require('../models')
class UserController {
  
  // static findOneUser(req, res, next){
  //   let { name, email, password} = req.body
  //   User.findOne({
  //     where: {
  //       email
  //     }
  //   })
  // }

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
          res.status(401).json({message: "Email already registered"})
        }else{
          return User.create({
            name,
            email,
            password
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
    User.findOne({
      wher: {
        email
      }
    })
    .then(data => {
      if(data){
        if(data.password === password){
          //jwt harusnya
          res.status(200).json({ message: "" })
        }
      }else{
        res.type('application/json')
        res.status(401).json({ message: "Wrong email or password" })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}
module.exports = UserController