const ItemController = require('../controllers/itemController.js')
const {authentication, authorization} = require('../middlewares/auth.js')

const express = require('express')
const router = express.Router()

router.get('/', ItemController.findAll)
router.get('/:id', ItemController.findOne)

router.post('/', authentication, ItemController.create)
router.put('/:id', authentication, ItemController.update)
router.delete('/:id', authentication, ItemController.destroy)

// const { authentication, authCustomer, authAdmin, authorization} = require('../middlewares/auth')
// const multer = require('../middlewares/multer')
// const gcs = require('../middlewares/gcs')

// router.get('/', ItemController.showAll)
// router.get('/:id', ItemController.showOne)
// router.post('/', authAdmin, multer.single('image'), gcs, ItemController.create)
// router.put('/:id', authAdmin, ItemController.update)
// router.delete('/:id', authAdmin, ItemController.delete)

module.exports = router