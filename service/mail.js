const { SendMailClient } = require("zeptomail");

const dotenv = require("dotenv");
dotenv.config();

// Mail server token and uri
const url = process.env.MAILURI;
const token = process.env.MAILTOKEN;

// console.log(TOKEN);

const mailEngine = async (data) => {
  let client = new SendMailClient({ url, token });

  // creating user address object to send address
  const userdata = data.user.map((user) => ({
    email_address: {
      address: user.mailid,
      name: user.name,
    },
  }));

  //   userdata = JSON.parse(userdata);

  console.log(userdata);

  const response = await client
    .sendMail({
      from: {
        address: "noreply@trainmenu.com",
        name: "noreply",
      },
      to: userdata,
      subject: "Order created successfully",
      htmlbody: "<div><b> Test email sent successfully.</b></div>",
    })
    .then((resp) => {
      console.log(resp);
      return resp;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return response;
};

module.exports = mailEngine;
