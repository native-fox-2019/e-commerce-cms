const router = require('express').Router()
const bannerController = require('../controllers/bannerController')
const authentication = require('../middlewares/authentication')
const authorizationAdmin = require('../middlewares/authorizationAdmin')

router.get('/', bannerController.getAll)
router.get('/:id', bannerController.getOne)
router.use(authentication)
router.use(authorizationAdmin)
router.patch('/:id', bannerController.update)
router.post('/', bannerController.create)
router.delete('/:id', bannerController.destroy)

module.exports = router
