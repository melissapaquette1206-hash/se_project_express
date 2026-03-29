const router = require("express").Router();
const userRouter = require("./users");
router.use("/users", userRouter);
const clothingItemsRouter = require("./clothingItems");
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_ERROR_CODE)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
