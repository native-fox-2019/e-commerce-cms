const router = require('express').Router()
const Controller = require('../controllers/Product')

router.post('/', Controller.create)
router.get('/search', Controller.getByCategory)
router.get('/', Controller.getAll)
router.get('/:id', Controller.getOne)
router.put('/:id', Controller.update)
router.delete('/:id', Controller.delete)
module.exports = router