const router = require(`express`).Router();
const { product } = require(`../controllers`);
const authorize = require(`../middleware/authorize`);

router.get(`/`, product.read);
router.get(`/:id`, product.getOne);
router.post(`/`, product.create);

router.use(`/:id`, authorize);
router.put(`/:id`, product.update);
router.delete(`/:id`, product.delete);

module.exports = router;
