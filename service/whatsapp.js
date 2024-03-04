const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

const WHATSAPPTOKEN = process.env.WHATSAPPTOKEN
const LICENSENUMBER = process.env.LICENSENUMBER
// const WHATSAPPURL = process.env.WHATSAPPURL


const whatsappEngine = async (customer, sender) => {
    const templatename = 'place_order'

    const c = {
        name: customer.name,
        orderid: customer.orderid,
        trainno: customer.trainno,
        doj: customer.doj,
        seatno: customer.seatno,
        stationid: customer.stationid,
        expecteddeliverytime: customer.expecteddeliverytime,
        paymentmode: customer.ordertype
    }
    const param = {
        license: LICENSENUMBER,
        template: templatename,
        apikey: WHATSAPPTOKEN,
        contact: customer.wnumber,
    }

    const URL = `https://app.chatboat.in/api/sendtemplate.php?LicenseNumber=${param.license}&APIKey=${param.apikey}&Contact=${param.contact}&Template=${templatename}&Param=${c.name},${c.orderid},${c.trainno},${c.doj},${c.seatno},${c.stationid},${c.expecteddeliverytime},${c.paymentmode}`

    console.log(URL);
    const sendWhatsapp = async (url) => {
        try {
            const response = await axios.get(url)
            if (response.status === 200) {
                // console.log(response.data);
                return response.data;
            } else {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            return error.message;
        }
    }

    // Example usage:
    result = await sendWhatsapp(URL);
// console.log(result);
    return result
}


module.exports = whatsappEngine