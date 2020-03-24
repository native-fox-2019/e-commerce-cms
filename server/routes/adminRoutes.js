const router = require(`express`).Router()
const { admin } = require(`../controllers`)

router.post(`/register`, admin.register)
router.post(`/login`, admin.login)

module.exports = router