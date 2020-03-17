const router = require(`express`).Router()

const admin = require(`./adminRoutes`)

router.get(`/`, (req, res) => {
    res.send(`home`)
})

router.use(`/admins`, admin)

module.exports = router