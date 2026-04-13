const router = require("express").Router();
const auth = require("../middlewares/auth");

const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const usersRouter = require("./users");

router.post("/signup", createUser);
router.post("/signin", login);
router.get("/items", getItems);

router.use(auth);
router.use("/users", usersRouter);
