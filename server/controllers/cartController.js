const { Cart, Product, User } = require('../models')

class CartController {

    static async getAll (req, res, next) {
        try {
            const findAll = await User.findAll({where:{id:req.userData.id}, include: Product})
            res.json(findAll)
        } catch (err) {
            next(err)
        }
    }

    static async addToCart (req, res, next) {
        const addCart = {
            user_id: req.userData.id,
            product_id: req.body.product_id,
            amount: req.body.amount,
            total: req.body.total
        }
        try {
            const adding = await Cart.create(addCart)
            res.status(200).json(adding)
        } catch (err) {
            next(err)
        }
    }

    static async deleteCart (req, res, next) {
        try {
            const deleting = await Cart.destroy({where:{id: req.params.id}})
            if(deleting == 0) {
                next({
                    status: 404,
                    msg: 'Cart cannot be found'
                })
            } else {
                res.status(200).json('Cart deleted')
            }
        } catch (err) {
            next(err)
        }
    }

    static async deleteAllCart (req, res, next) {
        try {
            const deleteAll = await Cart.destroy({where:{user_id:req.userData.id}})
            res.status(200).json('Checkout completed')
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CartController