const mailEngine = require("./service/mail");

const payload = {
  service: ["email", "message", "whatsapp"],
  user: [
    {
      name: "Kaushal",
      orderid: "TM908433",
      orderdetails: "ROTI, BUTTER PANEER",
      orderamount: 500,
      time: "10:00:00",
      ordernote: "This is an order note",
      number: 7050020659,
      mailid: "adityaraj6220@gmail.com",
      wnumber: 7050020659,
    },
    {
      name: "Aditya RAJ",
      orderid: "TM900573",
      orderdetails: "BIRYANI, RAITA",
      orderamount: 500,
      time: "10:00:00",
      ordernote: "This is an order note",
      number: 8903240659,
      mailid: "adityadesk99@gmail.com",
      wnumber: 8903240659,
    },
  ],
  sender: {
    name: "Trainmenu",
    phone: 8405076072,
    email: "service@trainmenu.com",
    address: "70 Feet Road, Patna",
    type: "transaction",
  },
};

const send = async (req, res) => {
  if (payload.service.includes("email")) {
    // Send to email client
    result = await mailEngine(payload);
    return await res.json(result);
  }

  if (payload.service.includes("phone")) {
    // Send to message client
    result = await messageEngine(payload);
    return await res.json(result);
  }
};

module.exports = send;
