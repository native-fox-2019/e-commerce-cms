/** @format */

"use strict";
module.exports = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).json({ message: [err.msg] });
  } else {
      res.status(500).json({ message: ['intenal server error'] })
  }
};
