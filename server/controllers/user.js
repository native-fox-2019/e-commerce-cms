'use strict'
const { User } = require('../models')
const { compare } = require('../helpers/passwordBcrypt')
const { generateToken } = require('../helpers/jwtToken')
const { encrypt } = require("../helpers/passwordBcrypt");
  class Controller {
    static register(req, res, next) {
      const { name, email, password } = req.body;
      User.create({
        name,
        email,
        password
      })
        .then(data => {
          const payload = {
            id: data.id,
            email: data.email
          };
          const token = generateToken(payload);
          res.status(201).json({
            name: data.name,
            token: token
          });
        })
        .catch(err => {
          next(err);
        });
    }

    static login(req, res, next) {
      const { email, password } = req.body;
      if (!email) {
        throw {
          status: 400,
          message: "Email Must Fillin"
        };
      } else if (!password) {
        throw {
          status: 400,
          message: "Password Must Fillin"
        };
      } else {
        User.findOne({
          where: {
            email: email
          }
        })
          .then(data => {
            if (!data) {
              throw {
                status: 404,
                message: "User Not Found"
              };
            } else {
              if (compare(password, data.password)) {
                if (data.admin === false) {
                  const payload = {
                    id: data.id,
                    email: data.email
                  };
                  const token = generateToken(payload);
                  res.status(200).json({
                    name: data.name,
                    token: token
                  });
                } else {
                  throw { status: 401, message: "Unauthorize" };
                }
              } else {
                throw {
                  status: 400,
                  message: "Invalid Email or Password"
                };
              }
            }
          })
          .catch(err => {
            next(err);
          });
      }
    }
    static loginAdmin(req, res, next) {
      const { email, password } = req.body;
      User.findOne({
        where: {
          email
        }
      })
        .then(data => {
          if (!data) {
            throw {
              status: 404,
              message: "Data Not Found"
            };
          } else {
            if (data.admin !== true) {
              throw {
                status: 401,
                message: "Unauthorize"
              };
            } else {
              if (compare(password, data.password)) {
                const payload = {
                  id: data.id,
                  email: data.email
                };
                const token = generateToken(payload);
                res.status(200).json({
                  token,
                  name: data.name
                });
              } else {
                throw {
                  status: 400,
                  message: "Invalid Email or Password"
                };
              }
            }
          }
        })
        .catch(err => {
          next(err);
        });
    }
    static findAll(req, res, next) {
      User.findAll()
        .then(data => {
          if (!data) {
            throw {
              status: 404,
              message: "Data Not Found"
            };
          } else {
            res.status(200).json(data);
          }
        })
        .catch(err => {
          next(err);
        });
    }
    static findOne(req, res, next) {
      const { id } = req.params;
      User.findOne({
        where: { id: id }
      })
        .then(data => {
          if (!data) {
            throw { status: 404, message: "Data Not Found" };
          } else {
            res.status(200).json(data);
          }
        })
        .catch(err => {
          next(err);
        });
    }
    static create(req, res, next) {
      const { name, email, password } = req.body;
      User.create({
        name,
        email,
        password,
        admin: true
      })
        .then(data => {
          res.status(201).json(data);
        })
        .catch(err => {
          next(err);
        });
    }
    static update(req, res, next) {
      const { id } = req.params;
      const { name, email, password, admin } = req.body;
      User.update(
        {
          name,
          email,
          password: encrypt(password),
          admin
        },
        {
          where: { id },
          returning: true
        }
      )
        .then(data => {
          console.log(data[0]);
          if (!data[0]) {
            throw { status: 404, message: "Data Not Found" };
          } else {
            res.status(200).json(data[1][0]);
          }
        })
        .catch(err => {
          next(err);
        });
    }
    static destroy(req, res, next) {
      const { id } = req.params;
      User.destroy({
        where: { id }
      })
        .then(data => {
          if (!data) {
            throw {
              status: 404,
              message: "Data Not Found"
            };
          } else {
            res.status(200).json("User hasbeen removed");
          }
        })
        .catch(err => {
          next(err);
        });
    }
  };

module.exports = Controller
