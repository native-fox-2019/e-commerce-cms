const router = require('express').Router()
const userRoutes = require('./user')

router.get('/', (req, res, next) => {
    res.status(200).send("Hope the Test passed")
})
router.use('/user', userRoutes)
module.exports = router