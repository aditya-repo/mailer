const mailEngine = require("./service/mail");
const messageEngine = require("./service/message");
const shortnerEngine = require("./service/shorten");
const Url = require("./model/url");
const whatsappEngine = require("./service/whatsapp");
const Payload = require("./model/user");
const { mailStatus, messageStatus, whatsappStatus } = require("./middlewares/statuscode");
const { messageTemplateId, emailTemplate, whatsappTemplateId } = require("./util");
const SentUser = require("./model/sent");
const axios = require('axios')
const dotenv = require('dotenv');
const { responseback } = require("./middlewares/sent");
dotenv.config()
const AUTHKEY = process.env.AUTHKEY
const TESTURL = process.env.TESTURL


const send = async (req, res) => {


  // Send back the immediate response
  responseback(res)

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

  console.log(TESTURL);

  const targetUrl = TESTURL;

  const response = await axios.post(targetUrl, result, {
    headers: {
      'Authorization': `Bearer ${AUTHKEY}`,
      'Content-Type': 'application/json'
    }
  });

  console.log(response.data);

  // return res.send(response)

  console.log(result, response.data);
  return

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
