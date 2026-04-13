const router = require("express").Router();
const auth = require("../middlewares/auth");

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", protectedItemsRouter);

module.exports = router;
