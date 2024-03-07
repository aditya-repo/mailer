const mailEngine = require("./service/mail");
const messageEngine = require("./service/message");
const shortnerEngine = require("./service/shorten");
const Url = require("./model/url");
const whatsappEngine = require("./service/whatsapp");
const Payload = require("./model/user");
const { mailStatus, messageStatus, whatsappStatus } = require("./middlewares/statuscode");
const { messageTemplateId, emailTemplate, whatsappTemplateId } = require("./util");
const SentUser = require("./model/sent");

// let payload = {
//   service: ["email", "message", "whatsapp"],
//   user: {
//     userid: 23152465,
//     name: "Aditya RAJ",
//     vendorname: "Rajeev Ranjan",
//     seatno: "D 75",
//     orderid: "TM900573",
//     orderstatus: "CANCELLED",
//     orderdetails: "BIRYANI, RAITA",
//     trainno: "56468",
//     doj: "24-10-2024",
//     store: "Pal Hotel, Patna",
//     expecteddeliverytime: "2 Hour",
//     stationid: "PNBE",
//     orderamount: 500,
//     ordertype: "COD",
//     paymentstatus: "Online Paid",
//     itemdetails: { itemname: "PANNER BUTTER MASALA COMBO", quantity: 1, price: 200 },
//     time: "10:00:00",
//     ordernote: "This is an order note",
//     number: 7050020659,
//     number2: 9576879382,
//     mailid: "adityadesk99@gmail.com",
//     wnumber: 8409049571,
//     url: "https://trainmenu.com",
//   },
//   sender: {
//     name: "Trainmenu",
//     phone: 8405076072,
//     email: "service@trainmenu.com",
//     address: "70 Feet Road, Patna",
//     type: "transaction",
//     mail: "noreply@trainmenu.com",
//     template: "VACCEPTED",
//   },
// };

const send = async (req, res) => {
  // return res.json({message: "Success"})
  let email, message, shortner, userid;

  const { payload } = req.body;
  let result = {};

  let data = payload.user

  shortner = await shortnerEngine(data.url);
  data.url = `trmn.in/${shortner}`;
  userid = data.userid;

  result = { ...result, userid };

  await Payload.create(payload);

  if (payload.service.includes("email")) {
    if (emailTemplate.hasOwnProperty(payload.sender.template)) {
      // Sending Email...
      email = await mailEngine(data, payload.sender);
      // Return Message Status
      email = mailStatus(email)
      result = { ...result, email };
    }
  }

  if (payload.service.includes("message")) {
    if (messageTemplateId.hasOwnProperty(payload.sender.template)) {
      // Sending Message...
      const phone = await messageEngine(data, payload.sender);
      // Return Message Status
      message = messageStatus(phone)
      result = { ...result, message };
    }
  }

  if (payload.service.includes("whatsapp")) {
    if (whatsappTemplateId.hasOwnProperty(payload.sender.template)) {
      // Send to message client
      whatsapp = await whatsappEngine(data, payload.sender);
      whatsapp = whatsappStatus(whatsapp)
          result = { ...result, whatsapp };
      // res.json(whatsapp)
    }

  }

        // Save the URL to the database
        const entrydata = new SentUser(result);
        await entrydata.save();
    res.json(result);

};

const getShortenLink = async (req, res) => {
  const { shortid } = req.params;
  // Find the original URL in the database
  const urlEntry = await Url.findOne({ shortUid: shortid });
  if (urlEntry) {
    res.redirect(urlEntry.originalUrl);
  } else {
    res.status(404).send("URL not found");
  }
};

module.exports = { send, getShortenLink };
