const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 8040;
const { send, getShortenLink } = require("./controller");
const database = require("./model");
const authenticate = require("./middlewares/auth");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database();

app.get("/", (req, res) => res.json({ Message: "Hello from Mail server" }));
app.post("/", authenticate, send);
app.get("/:shortid", getShortenLink);

app.listen(PORT, () => {
  app.use(express.urlencoded({ extended: true }));
  console.log(`Server started on PORT : ${PORT}`);
});
