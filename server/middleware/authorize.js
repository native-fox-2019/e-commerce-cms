const createError = require(`../helpers/createErrors`);
const model = require(`../models`);

module.exports = (req, res, next) => {
  model.Product.findByPk(Number(req.params.id))
    .then(data => {
      if(data) {
        if (data.UserId === req.user.id || req.user.role === `admin`) {
          next();
        } else {
          throw createError(403, `You are not authorized to do this action`);
        }
      } else {
        throw createError(404, `Product of id ${req.params.id} does not exist`)
      }
    })
    .catch(next);
};
