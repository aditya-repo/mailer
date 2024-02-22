const dotenv = require("dotenv");
dotenv.config();

const URI = process.env.MESSAGEURI;
const TOKEN = process.env.MESSAGETOKEN;

const messageEngine = (data) => {
  console.log(data);
};

module.exports = messageEngine;
