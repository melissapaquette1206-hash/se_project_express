const router = require("express").Router();

const { validateItem, validateId } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

router.use(auth);

router.post("/", validateItem, createItem);
router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, dislikeItem);

module.exports = router;
