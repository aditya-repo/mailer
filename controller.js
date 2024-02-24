const mailEngine = require("./service/mail");
const messageEngine = require("./service/message");
const shortnerEngine = require('./service/shorten');
const Url = require('./model/url')

const payload = {
  service: ["email", "message", "whatsapp"],
  user: [
    {
      name: "Aditya RAJ",
      seatno: "D 75",
      orderid: "TM900573",
      orderstatus: "CANCELLED",
      orderdetails: "BIRYANI, RAITA",
      trainno: "56468",
      store: "Pal Hotel, Patna",
      expecteddeliverytime: "2 Hour",
      stationid: "PNBE",
      orderamount: 500,
      ordertype: "COD",
      time: "10:00:00",
      ordernote: "This is an order note",
      number: 7050020659,
      mailid: "adityadesk99@gmail.com",
      wnumber: 8903240659,
      url: "https://trainmenu.com"
    },
  ],
  sender: {
    name: "Trainmenu",
    phone: 8405076072,
    email: "service@trainmenu.com",
    address: "70 Feet Road, Patna",
    type: "transaction",
    mail: "noreply@trainmenu.com",
    template: "ACCEPTED"
  },
};

const send = async (req, res) => {

  let email, phone, shortner;

  for (const data of payload.user) {

    if (payload.service.includes("email")) {
      // Send to email client
      email = await mailEngine(data, payload.sender);
    }

    if (payload.service.includes("message")) {
      // Send to message client
      phone = await messageEngine(data,payload.sender);
    }

    shortner = await shortnerEngine(data.url)
    // console.log(shortner)

  }


  const result = { payload, email, phone, shortner }
  res.json(result)
};

const getShortenLink = async (req, res) => {

  const { shortid } = req.params;
  // Find the original URL in the database
  const urlEntry = await Url.findOne({ shortUid: shortid });
  if (urlEntry) {
    res.redirect(urlEntry.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
}

module.exports = { send, getShortenLink };
