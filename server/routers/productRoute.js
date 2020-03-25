const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const productController = require('../controllers/productController')
const bannerController = require('../controllers/bannerController')

router.get(`/`, productController.show)
router.post(`/add`, authentication, authorization, productController.addProduct)
router.get(`/banner`, bannerController.getBanner)
router.post(`/banner`, authentication, authorization, bannerController.addBanner)
router.delete(`/banner/:id`, authentication, authorization, bannerController.deleteBanner)
router.put('/edit/stock/:id', authentication, productController.decreaseStock)
router.put(`/edit/:id`, authentication, authorization, productController.update)
router.delete(`/delete/:id`, authentication, authorization, productController.delete)

module.exports = router