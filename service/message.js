const axios = require('axios');
const dotenv = require("dotenv");
const { messageTemplate, messageTemplateId } = require('../util');
dotenv.config();

const TOKEN = process.env.MESSAGETOKEN;
const MESSAGEID = process.env.MESSAGEID;
const MESSAGEURL = process.env.MESSAGEURL;
const PHONE = process.env.TMPHONE;
// const SHORTURL = process.env.SHORTENEDURL;

const messageEngine = async (userdata, metadata) => {
  // console.log(data);
  const templatetype = metadata.template
  // creating user address object to send address
  const url = MESSAGEURL;

  // Replace with your actual values
  const orderid = userdata.orderid;
  const station = userdata.stationid;
  const number = userdata.number;

  const message = messageTemplate(userdata, templatetype)

  // Constructing the parameters
  const params = {
    'authentic-key': TOKEN,
    'senderid': MESSAGEID,
    'route': '1',
    'number': number,
    'message': message,
    'templateid': messageTemplateId[metadata.template]
  };

  const fetchData = async (url, params) => {
    try {
      const response = await axios.get(url, { params });

      if (response.status === 200) {
        // console.log(response.data);
        return response.data;
      } else {
        console.log(response.data);
        return response.data;
      }
    } catch (error) {
      // console.log(error.message);
      return error.message;
    }
  };

  // Example usage:
  result = await fetchData(url, params);

  return result

};



module.exports = messageEngine;
