const router = require('express').Router()
const Controller = require('../controllers/generalController')
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.get('/products', Controller.getAll)
router.get('/products/:id', Controller.getOne)

module.exports = router