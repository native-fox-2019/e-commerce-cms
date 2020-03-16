"use strict";
const { User } = require("../models");
const { comparePass } = require("../helper/passwordHelper");
const { generateTok } = require("../helper/tokenHelper");

class UserController {
  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ where: { email } })
      .then(data => {
        if (data && comparePass(password, data.password)) {
          res.status(200).json({token: generateTok({ id: data.id, email: data.email })});
        } else {
          console.log('elseeee')
          const error = {
            status: 404,
            msg: "email or password wrong!"
          };
          throw error
        }
      })
      .catch(err => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { first_name, last_name, email, password } = req.body;
    User.create({ first_name, last_name, email, password })
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        next(err);
      });
  }

  // static googleLogin(req, res, next) {}
}

module.exports = UserController;
