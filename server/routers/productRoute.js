const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const productController = require('../controllers/productController')

router.post(`/add`, productController.addProduct)
router.get(`/`, productController.show)
router.put(`/edit/:id`, productController.update)
router.delete(`/delete/:id`, productController.delete)

module.exports = router