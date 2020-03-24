const model = require(`../models`);
const createError = require(`../helpers/createErrors`);
const bcrypt = require(`../helpers/bcrypt`);
const jwt = require(`../helpers/jwt`);

class adminController {
  static register(req, res, next) {
    var { email, password } = req.body;

    model.User.create({
      email,
      password,
      role: `admin`
    })
      .then(data => {
        var token = jwt.sign({
          id: data.id,
          role: data.role
        });

        res.status(201).json({
          token,
          role: data.role
        });
      })
      .catch(err => {
        if (err.name == `SequelizeUniqueConstraintError`) {
          next(createError(400, `Email is already used`));
        } else {
          next(err);
        }
      });
  }

  static login(req, res, next) {
    var { email, password } = req.body;

    model.User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if (data) {
          if (bcrypt.compare(password, data.password)) {
            var token = jwt.sign({
              id: data.id,
              role: data.role
            });

            res.status(200).json({
              token,
              role: data.role
            });
          } else {
            throw createError(404, `Wrong Email/Password`);
          }
        } else {
          throw createError(404, `Wrong Email/Password`);
        }
      })
      .catch(next);
  }
}

module.exports = adminController;
