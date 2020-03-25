const ItemController = require('../controllers/itemController.js')
const {adminAuth} = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', ItemController.findAll)
router.get('/:id', ItemController.findOne)

router.post('/', adminAuth, ItemController.create)
router.put('/:id', adminAuth, ItemController.update)
router.delete('/:id', adminAuth, ItemController.destroy)

// router.post('/', authentication, ItemController.create)
// router.put('/:id', authentication, ItemController.update)
// router.delete('/:id', authentication, ItemController.destroy)

module.exports = router