const { verify } = require("../helpers/jwt");
module.exports = {
  authentication(req, res, next) {
    try {
      let { access_token } = req.headers;
      req.user = verify(access_token);
      next();
    } catch (error) {
      next(error);
    }
  }
};
