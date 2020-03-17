const ItemController = require('../controllers/itemController.js')
const {authentication, authorization} = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', ItemController.findAll)
router.post('/', ItemController.create)

router.get('/:id', ItemController.findOne)
router.put('/:id', ItemController.update)
router.delete('/:id', ItemController.destroy)

// const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')
// const multer = require('../middlewares/multer')
// const gcs = require('../middlewares/gcs')

// router.get('/', ItemController.showAll)
// router.get('/:id', ItemController.showOne)
// router.post('/', authAdmin, multer.single('image'), gcs, ItemController.create)
// router.put('/:id', authAdmin, ItemController.update)
// router.delete('/:id', authAdmin, ItemController.delete)

module.exports = router