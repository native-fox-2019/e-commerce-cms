const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const productController = require('../controllers/productController')

router.get(`/`, productController.show)
router.post(`/add`, authentication, authorization, productController.addProduct)
router.put(`/edit/:id`, authentication, authorization, productController.update)
router.delete(`/delete/:id`, authentication, authorization, productController.delete)

module.exports = router