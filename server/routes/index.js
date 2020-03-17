const router = require(`express`).Router();

const admin = require(`./adminRoutes`);
const product = require(`./productRoutes`)
const authen = require(`../middleware/authenticate`)

router.get(`/`, (req, res) => {
  res.send(`home`);
});

router.use(`/admins`, admin);
router.use(authen)
router.use(`/products`, product)

module.exports = router;
