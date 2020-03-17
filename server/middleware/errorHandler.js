module.exports = (err, req, res, next) => {
  // console.log(err, '<<<<<<<< error console error handler ????')
  if (err.name === 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(el => {
      errors.push(el.message)
    });
    res.status(400).json(errors)
  }
  // else if (err.name == 'BadRequestError') { res.status(400).json(err.message) }
  else if (err.name == 'BadRequestError') { res.status(400).json(err.message) }
  else if (err.name === 'NotFoundError') { res.status(404).json(err.message) }
  else if (err.name === 'JsonWebTokenError') { res.status(406).json('Not Acceptable') }
  else { res.status(500).json('500 internal server error') }
}