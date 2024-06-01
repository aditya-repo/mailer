const dotenv = require('dotenv');
const vaccepted = require('./templates/vaccepted');
const cplaced = require('./templates/cplaced');
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

const messageTemplateId = {
    "PLACED": "1207168157481008393",
    "ACCEPTED": "1207170885741410979",
    "DELIVERED": "1207168157546932475",
    "UNDELIVERED": "1207170885745505813",
    "VCANCELLED": "1207170885554350312",
}

// Email template Map
const emailTemplate = {
    "PLACED": "2518b.7689ed5afbee3a34.k1.434abdd0-d0af-11ee-b834-52540038fbba.18dcb7fca2d",
    "ACCEPTED": "2518b.7689ed5afbee3a34.k1.a5768ea1-d0c1-11ee-b834-52540038fbba.18dcbf8448a",
    "CANCELLED": "2518b.7689ed5afbee3a34.k1.8bb89760-d0c1-11ee-b834-52540038fbba.18dcbf79bd6",
    "UNDELIVERED": "2518b.7689ed5afbee3a34.k1.f88a5e60-d0c0-11ee-b834-52540038fbba.18dcbf3d746",
    "VACCEPTED": "2518b.7689ed5afbee3a34.k1.0d374ea0-d55c-11ee-8b58-525400b0b0f3.18dea23108a",
    "VCANCELLED": "2518b.7689ed5afbee3a34.k1.dc2ba1d0-dc77-11ee-96f3-52540038fbba.18e18b95c6d",
    "VDELIVERED": "2518b.7689ed5afbee3a34.k1.ebfdb3d0-dc79-11ee-96f3-52540038fbba.18e18c6df8d",
    "VUNDELIVERED": "2518b.7689ed5afbee3a34.k1.3e383a91-dc79-11ee-96f3-52540038fbba.18e18c26cb4",
}

const whatsappTemplateId = {
    "PLACED": "customerplaced",
    "ACCEPTED": "caccepted",
    "DELIVERED": "cdelivered",
    "UNDELIVERED": "cstundelivered",
    "CANCELLED": "cuscancelled",
    "VACCEPTED": "venplaced",
    "VDELIVERED": "vdelivered",
    "VUNDELIVERED": "vundelivered",
    "VCANCELLED": "vcancel",
}

const mergeInfoType = (userdata, template) => {
    let temp;

    let data;
    if (template == 'ACCEPTED') {
        data = { seat: userdata.seatno, deliverystation: userdata.stationid, orderstatus: userdata.orderstatus, orderid: userdata.orderid, trainno: userdata.trainno, store: userdata.store, expecteddeliverytime: userdata.expecteddeliverytime }
    }
    if (template == 'CANCELLED') {
        data = { ordeid: userdata.orderid, orderid: userdata.orderid, deliverystation: userdata.stationid, customer: userdata.name, trainno: userdata.trainno, store: userdata.store }
    }
    if (template == 'UNDELIVERED') {
        data = { deliverystation: userdata.stationid, orderstatus: userdata.orderstatus, orderid: userdata.orderid, trainno: userdata.trainno, store: userdata.store }
    }
    if (template == 'VACCEPTED') {
        temp = vaccepted(userdata.itemdetails)
        // console.log(temp);return
        data = { number: userdata.number, ordernote: userdata.ordernote, orderid: userdata.orderid,name: userdata.name, vendorname: userdata.vendorname, paymentstatus: userdata.duepayment, trainno: userdata.trainno, seatno: userdata.seatno, seatno: userdata.seatno, expecteddeliverytime: userdata.expecteddeliverytime, stationid: userdata.stationid, table_body: temp }
    }
    if (template == 'VCANCELLED') {
        data = { ordeid: userdata.orderid, orderid: userdata.orderid, deliverystation: userdata.stationid, reasons: userdata.remarks, Vendor: userdata.store, trainno: userdata.trainno }
    }
    if (template == 'VUNDELIVERED') {
        data = { Vendor: userdata.store, orderid: userdata.orderid }
    }
    if (template == 'VDELIVERED') {
        data = { Vendor: userdata.store, orderid: userdata.orderid }
    }

    if (template == 'PLACED') {
        temp = cplaced(userdata.itemdetails, userdata.paymentdata)
        data = { paymentmode: userdata.duepayment, stationid: userdata.stationid, orderid: userdata.orderid, trainno: userdata.trainno, seatno: userdata.seatno, doj: userdata.doj, expecteddeliverytime: userdata.expecteddeliverytime, stationid: userdata.stationid, table_body: temp, name: userdata.name }
    }

    data = JSON.stringify(data)
    return data;
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
    return message
}


const whatsappTemplate = (u, template) => {
    let message;
    if (template == 'PLACED') {
        message = `${u.name},${u.stationid},${u.store},${u.orderid},${u.trainno},${u.seatno},${u.duepayment},${u.orderdetails}, ${u.ordernote} `
    }
    if (template == 'ACCEPTED') {
        message = `${u.name},${u.orderid},${u.stationid}&HeadParam=${u.orderid}`
    }
    if (template == 'DELIVERED') {
        message = `${u.name},${u.orderid}`
    }
    if (template == 'UNDELIVERED') {
        message = `${u.name},${u.orderid},${u.remarks}&HeadParam=${u.orderid}`
    }
    if (template == 'CANCELLED') {
        message = `${u.name},${u.orderid},${u.remarks}&HeadParam=${u.orderid}`
    }
    if (template == 'VACCEPTED') {
        message = `${u.store},${u.orderid},${u.trainno},${u.stationid}, ${u.expecteddeliverytime}, ${u.name},${u.cnumber},${u.seatno},${u.duepayment},${u.orderdetails},${u.ordernote}`
    }
    if (template == 'VCANCELLED') {
        message = `${u.store},${u.orderid},${u.remarks}&HeadParam=${u.orderid}`
    }
    if (template == 'VUNDELIVERED') {
        message = `${u.store},${u.orderid}&HeadParam=${u.orderid}`
    }
    if (template == 'VDELIVERED') {
        message = `${u.store},${u.orderid}&HeadParam=${u.orderid}`
    }
    // console.log(template);
    return message
}


module.exports = { generateUid, mergeInfoType, emailTemplate, messageTemplate, messageTemplateId, whatsappTemplate, whatsappTemplateId }
