const router = require("express").Router();

const { validateSignup, validateSignin } = require("../middlewares/validation");

const auth = require("../middlewares/auth");

const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);
router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

module.exports = router;
