const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const productController = require('../controllers/productController')

router.post(`/add`, authentication, productController.addProduct)
router.get(`/`, productController.show)
router.put(`/edit/:id`, authentication, productController.update)
router.delete(`/delete/:id`, authentication, productController.delete)

module.exports = router