'use strict'

function showError(err, req, res, next) {
  // console.log(err);
  let errs = []
  if (err.name === "SequelizeValidationError") {
    err.errors.forEach(error => {
      errs.push(error.message)
    })
    res.status(400).json(errs)
  } else if (err.name === "SequelizeUniqueConstraintError") {
    err.errors.forEach(error => {
      errs.push(error.message)
    })
    res.status(400).json(errs)
  } else if (err.status) {
    res.status(err.status).json(err.msg)
  } else {
    res.status(500).json(err)
  }
}

module.exports = showError
