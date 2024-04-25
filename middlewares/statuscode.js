// Create an object to return back to user to the communication status

const mailStatus = data => {
    let message, status, details;
    if (data.error) {
        message = data.error.message
        switch (data.error.code) {
            case 'TM_3201':
                status = 'ER01'
                break;
            case 'TM_3501':
                status = 'ER02'
                break;
            case 'TM_4001':
                status = 'ER03'
                break;

            case 'TM_8001':
                status = 'ER04'
                break;
            default:
                status = 'ER00'
                break;
        }
        details = data.error.details[0]
    }

    if (data.data) {
        message = data.message
        switch (data.message) {
            case 'OK':
                status = 'ER03'
                break;
            default:
                status = 'SU02'
                break;
        }
        details = data.data[0]
    }

    return { status, message, details }
}

const messageStatus = data => {
    let message, status, details
    message = data.Status
    details = data.Description

    const codeMap = {
        '001': 'SU01',
        '002': 'ER03',
        '003': 'ER03',
        '008': 'ER03',
        '016': 'ER02',
        '017': 'ER03',
        '005': 'ER01',
        '018': 'ER01',
        '021': 'ER01',
        '022': 'ER01',
        '023': 'ER01',
    }

    status = codeMap[data.Code] || 'SU02'
    return { status, message, details }

}

const whatsappStatus = data => {
    let message, status, details
    message = data.ApiResponse
    details = data.ApiMessage

    const codeMap = {
        '001': 'SU01',
        '002': 'ER03',
        '003': 'ER03',
        '008': 'ER03',
        '016': 'ER02',
        '017': 'ER03',
        '005': 'ER01',
        '018': 'ER01',
        '021': 'ER01',
        '022': 'ER01',
        '023': 'ER01',
    }

    status = codeMap[data.Code] || 'SU02'
    return { status, message, details }
    // return { message, details }

}

module.exports = { mailStatus, messageStatus, whatsappStatus }
