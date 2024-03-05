const { SendMailClient } = require("zeptomail");
const dotenv = require("dotenv");
const { mergeInfoType, emailTemplate } = require("../util");
dotenv.config();

// Mail server token and uri
const url = process.env.MAILURI;
const token = process.env.MAILTOKEN;

const mailEngine = async (userdata, metadata) => {

    const email_address = {
      address: userdata.mailid,
      name: userdata.name,
    }

    const templatetype = metadata.template

    let client = new SendMailClient({ url, token });

    const response = await client
      .sendMail({
        mail_template_key: emailTemplate[templatetype],
        from: {
          address: metadata.mail,
          name: metadata.name,
        },
        to: [{email_address}], // Corrected line
        subject: "Order created successfully",
        merge_info: mergeInfoType(userdata, templatetype),
      })
      .then((resp) => {
        // console.log(resp);
        return resp;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

  return response;
};

module.exports = mailEngine;
