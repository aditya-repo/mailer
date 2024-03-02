const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
PORT = process.env.PORT || 8040;
const {send, getShortenLink} = require("./controller");
const database = require("./model");
const authenticate = require("./middleware");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

database()

// app.get("/", authenticate, send);
app.get("/", send);
app.get('/:shortid', getShortenLink)

app.listen(PORT, () => {
  app.use(express.urlencoded({ extended: true }));
  console.log(`Server started on PORT : ${PORT}`);
});
