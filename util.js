const dotenv = require('dotenv')
dotenv.config()

PHONE = process.env.TMPHONE

// Generate Unique 5 character id
const generateUid = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let uid = '';

    for (let i = 0; i < 5; i++) {
        uid += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return uid;
}

// Email template Map
const emailTemplate = {
    "ACCEPTED": "2518b.7689ed5afbee3a34.k1.a5768ea1-d0c1-11ee-b834-52540038fbba.18dcbf8448a",
    "CANCELLED": "2518b.7689ed5afbee3a34.k1.8bb89760-d0c1-11ee-b834-52540038fbba.18dcbf79bd6",
    "UNDELIVERED": "2518b.7689ed5afbee3a34.k1.f88a5e60-d0c0-11ee-b834-52540038fbba.18dcbf3d746"
}

const mergeInfoType = (userdata, template) => {

    let data;
    if (template == 'ACCEPTED') {
        data = { seat: userdata.seatno, deliverystation: userdata.stationid, orderstatus: userdata.orderstatus, orderid: userdata.orderid, trainno: userdata.trainno, store: userdata.store, expecteddeliverytime: userdata.expecteddeliverytime }
    }
    if (template == 'CANCELLED') {
        data = { ordeid: userdata.orderid, deliverystation: userdata.stationid, orderstatus: userdata.orderstatus, trainno: userdata.trainno, store: userdata.store }
    }
    if (template == 'UNDELIVERED') {
        data = { deliverystation: userdata.deliverystation, orderstatus: userdata.orderstatus, orderid: userdata.orderid, trainno: userdata.trainno, store: userdata.store }
    }

    data = JSON.stringify(data)
    return data;
}

const messageTemplateId = {
    "ACCEPTED": "1207168157481008393",
    "DELIVERED": "1207168157546932475",
}

const messageTemplate = (userdata, template) => {
    let message;
    if (template == 'ACCEPTED') {
        // Case & Space Sensetive
        message = `Your order#${userdata.orderid} has been placed for ${userdata.station}. Details & Status: ${userdata.url} or Call: ${PHONE} Trainmenu `;
    }
    if (template == 'DELIVERED') {
        // Case & Space Sensetive
        message = `Your order id ${userdata.orderid} is Delivered. Thanks for ordering with us. Share your food experience ${userdata.url}.
        Team Trainmenu `;
    }
    console.log(message);
    return message
}


module.exports = { generateUid, mergeInfoType, emailTemplate, messageTemplate, messageTemplateId }