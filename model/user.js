const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  seatno: String,
  orderid: String,
  orderstatus: String,
  orderdetails: String,
  trainno: String,
  doj: String,
  store: String,
  expecteddeliverytime: String,
  stationid: String,
  orderamount: Number,
  ordertype: String,
  time: String,
  ordernote: String,
  number: Number,
  mailid: String,
  wnumber: Number,
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
