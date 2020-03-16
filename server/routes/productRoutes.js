const express = require('express')
const router = express.Router()

const productControl = require('../controllers/productControl')

router.get('/show', productControl.show)
router.post('/create', productControl.create)
router.put('/edit', productControl.edit)
router.delete('/delete', productControl.delete)

module.exports = router