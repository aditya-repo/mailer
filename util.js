const dotenv = require('dotenv');
const vaccepted = require('./templates/vaccept');
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
    "UNDELIVERED": "2518b.7689ed5afbee3a34.k1.f88a5e60-d0c0-11ee-b834-52540038fbba.18dcbf3d746",
    "PLACED": "2518b.7689ed5afbee3a34.k1.434abdd0-d0af-11ee-b834-52540038fbba.18dcb7fca2d",
    "VACCEPTED": "2518b.7689ed5afbee3a34.k1.0d374ea0-d55c-11ee-8b58-525400b0b0f3.18dea23108a"
}

const mergeInfoType = (userdata, template) => {
    let temp;

    // console.log(userdata);

    // [{itemname, quantity, price}]

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
    if (template == 'PLACED') {
        data = { paymentmode: userdata.ordertype, stationid: userdata.stationid, orderid: userdata.orderid, trainno: userdata.trainno, seatno: userdata.seatno, doj: userdata.doj, expecteddeliverytime: userdata.expecteddeliverytime, stationid: userdata.stationid }
    }
    if (template == 'VACCEPTED') {
        temp = vaccepted(userdata.itemdetails)
        data = { number: userdata.number, ordernote: userdata.ordernote, orderid: userdata.orderid, name: userdata.name, paymentstatus: userdata.paymentstatus, trainno: userdata.trainno, number2: userdata.number2, seatno: userdata.seatno, seatno: userdata.seatno, vendorname: userdata.vendorname, expecteddeliverytime: userdata.expecteddeliverytime, stationid: userdata.stationid, table_body: temp }
    }

    data = JSON.stringify(data)
    return data;
}

const messageTemplateId = {
    "PLACED": "1207168157481008393",
    "DELIVERED": "1207168157546932475",
    "ACCEPTED": "1207170885741410979",
    "UNDELIVERED": "1207170885745505813",
    "CANCELLED": "",
    // "VACCEPTED": "1207170885741410979",
    "VCANCELLED": "1207170885554350312",

}

const messageTemplate = (userdata, template) => {
    let message;
        // Case & Space Sensetive
    if (template == 'PLACED') {
        message = `Your order#${userdata.orderid} has been placed for ${userdata.stationid}. Details & Status: ${userdata.url} or Call: ${PHONE} Trainmenu `;
    }
    if (template == 'ACCEPTED') {
        message = `Dear Customer, Your order #${userdata.orderid} has been ACCEPTED for ${userdata.stationid}. Details & Status : ${userdata.url} or Call: 7520202122. Team Trainmenu`;
    }
    if (template == 'DELIVERED') {
        message = `Your order id ${userdata.orderid} is Delivered. Thanks for ordering with us. Share your food experience ${userdata.url}.
        Team Trainmenu `;
    }
    if (template == 'UNDELIVERED') {
        message = `Dear  ${userdata.name}, Your Order ${userdata.orderid} is UNDELIVERED. To apologize, we offer a discount on your next order. Visit trmn.in/o . Team Trainmenu.`;
    }
    if (template == 'VCANCELLED') {
        message = `Dear Vendor, Order #${userdata.orderid} is CANCELLED due to a customer issue. We apologize for any inconvenience. Team Trainmenu`;
    }
    console.log(message);
    return message
}


module.exports = { generateUid, mergeInfoType, emailTemplate, messageTemplate, messageTemplateId }