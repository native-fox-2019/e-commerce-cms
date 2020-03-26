const ItemController = require('../controllers/itemController.js')
const {authentication, authorization} = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', ItemController.findAll)
router.get('/:id', ItemController.findOne)

router.post('/', authentication, ItemController.create)
router.put('/:id', authentication, ItemController.update)
router.delete('/:id', authentication, ItemController.destroy)

module.exports = router