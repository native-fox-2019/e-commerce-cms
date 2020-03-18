/** @format */

"use strict";
module.exports = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    let msg = err.errors.map(x => x.message)
    res.status(400).json({message : msg})
  } else if (err.status === 404) {
    res.status(err.status).json({ message: [err.msg] });
  } else if (err.status === 401) {
    res.status(err.status).json({ message: [err.msg] });
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({message : ['email has been used by other user!']})
  }else {
      res.status(500).json({ message: ['internal server error'] })
  }
};
