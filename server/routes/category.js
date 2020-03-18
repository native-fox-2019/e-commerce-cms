const controllerCategory = require('../controllers/category')
const router = require('express').Router()
// const authoris = require('../middleware/authoris')


router.get('/', controllerCategory.categoryAll)
router.post('/', controllerCategory.categoryAdd)
// router.put('/:id', controllerCategory.updateCategory)
// router.delete('/:id', controllerCategory.deleteCategory)


module.exports = router