const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: String,
  name: String,
  seatno: String,
  url: String,
  sender: {
    name: String,
    phone: Number,
    email: String,
    address: String,
    type: String,
    mail: String,
    template: String
  }
});

const payloadSchema = new mongoose.Schema({
  service: [String],
  user: [userSchema]
});

const Payload = mongoose.model('Payload', payloadSchema);

module.exports = Payload;
