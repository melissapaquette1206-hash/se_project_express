const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch(console.error);

app.use(express.json());

// app.use((req, res, next) => {
//   req.user = { _id: "69cd5dfc566af1f72942093f" };
//   next();
// });

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/signup", createUser);
app.post("/signin", login);

const auth = require("./middlewares/auth");
app.get("/items", getItems);
app.use(auth);

const cors = require("cors");

app.use(cors());
