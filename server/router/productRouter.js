const productRouter = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Authentication = require('../middlewares/Authentication')
const Authorization = require('../middlewares/Authorization')

productRouter.post('/', Authentication, ProductController.create)
productRouter.get('/', Authentication, ProductController.read)
productRouter.get('/:id', Authentication, Authorization, ProductController.readById)
productRouter.put('/:id', Authentication, Authorization, ProductController.update)
productRouter.delete('/:id', Authentication, Authorization, ProductController.delete)

module.exports = productRouter