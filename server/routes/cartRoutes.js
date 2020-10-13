const CartController = require('../controllers/cartController.js')
const { customerAuth, adminAuth, authorization } = require('../middlewares/auth.js')
const express = require('express')
const router = express.Router()

// Admin only
router.get('/', adminAuth, CartController.showAllCustomerCarts)

// ID params refers to ItemId
router.post('/:id', customerAuth, CartController.create)

// ID params refers to CartId
router.get('/:id', customerAuth, CartController.findOne)
router.delete('/:id', customerAuth, authorization, CartController.destroy)
router.put('/:id', customerAuth, authorization, CartController.update)

// Sends user's cart data (if the feature allows admin to order stuff as well, just remove customerAuth)
router.get('/user/all', customerAuth, CartController.showUserCarts)
router.get('/user/history', customerAuth, CartController.showUserCartsHistory)
router.get('/user/pending', customerAuth, CartController.showUserPendingCarts)

module.exports = router
