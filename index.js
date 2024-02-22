const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
PORT = process.env.PORT || 8040;
const send = require("./controller");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", send);

app.listen(PORT, () => {
  app.use(express.urlencoded({ extended: true }));
  console.log(`Server started on PORT : ${PORT}`);
});
