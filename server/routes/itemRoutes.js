const ItemController = require('../controllers/itemController.js')
const { authentication, adminAuth } = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', ItemController.findAll)
router.get('/:id', ItemController.findOne)

router.post('/', authentication, adminAuth, ItemController.create)
router.put('/:id', authentication, adminAuth, ItemController.update)
router.delete('/:id', authentication, adminAuth, ItemController.destroy)

// router.post('/', authentication, ItemController.create)
// router.put('/:id', authentication, ItemController.update)
// router.delete('/:id', authentication, ItemController.destroy)

module.exports = router