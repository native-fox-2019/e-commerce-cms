const { Product, User } = require('../models');
const createError = require('../helpers/createError');

authorization = async (req, res, next) => {
    try {
        let productId = Number(req.params.id);
        let userId = Number(req.UserData.id);
        let productData = await Product.findOne({ where: { id: productId } });
        if (!productData) {
            throw createError(404, 'Error Not Found');
        }
        let userData = await User.findOne({ where: { id: userId } });
        if (!userData || userData.role !== 'Admin') {
            throw createError(403, 'You are forbidden to do that');
        }
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authorization;