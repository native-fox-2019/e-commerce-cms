const express = require('express')
const router = express.Router()

const productControl = require('../controllers/productControl')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.get('/show', productControl.show)
router.get('/myshow', authentication, productControl.myshow)
router.get('/myshow/:id', authentication, productControl.myshowone)
router.post('/create', authentication, productControl.create)
router.put('/edit/:id', authentication, authorization, productControl.edit)
router.delete('/delete/:id', authentication, authorization, productControl.delete)

module.exports = router