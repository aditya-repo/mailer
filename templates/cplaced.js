const cplaced = (itemdetails, paymentdata) => {
    var htmlString = `
<tbody>
    <tr>
        <td style="width: 20px; text-align: center; height: 28px;border: 1px solid black;border-collapse: collapse;">
            <b>SL. No</b>.<br>
        </td>
        <td style="width: 200px;border: 1px solid black; text-align: center;">
            <div><b>ITEMS</b><br></div>
        </td>
        <td style="width: 30px;text-align:center;border: 1px solid black; text-align: center;">
            <div><b>QTY</b><br></div>
        </td>
        <td style="width: 20px; text-align:center;border: 1px solid black; text-align: center;">
            <div><b>UNIT PRICE</b><br></div>
        </td>
        <td style="width: 50px; text-align:center;border: 1px solid black; text-align: center;">
            <div><b>TOTAL</b><br></div>
        </td>
    </tr>
`;

    // Use a loop to add items dynamically
    for (var i = 0; i < itemdetails.length; i++) {

        htmlString += `
    <tr>
        <td style="width: 20px; text-align: center; height: 28px;border: 1px solid black">
            <div>${i + 1}<br></div>
        </td>
        <td style="width: 200px;padding-left:16px;border: 1px solid black">
            <div>${itemdetails[i].itemname}<br></div>
        </td>
        <td style="width: 30px; text-align:center;border: 1px solid black">
            <div>${itemdetails[i].quantity}<br></div>
        </td>
        <td style="width: 30px; text-align:center;border: 1px solid black">
            <div>${itemdetails[i].price}<br></div>
        </td>
        <td style="width: 30px; text-align:center;border: 1px solid black">
            <div>${itemdetails[i].quantity * itemdetails[i].price}<br></div>
        </td>
    </tr>
`;
    }

    htmlString += `
<tr>
    <td colspan="4" style="width: 150px;text-align:right;padding-right: 16px;border: 1px solid black; padding-top: 8px;padding-bottom:8px">
        <div><b>DELIVERY CHARGE</b> <br></div>
    </td>
    <td style="width: 50px; text-align:center;border: 1px solid black; padding-top: 8px;padding-bottom:8px">
        <div>
            <b><span class="size" style="color:green"> FREE</span></b><br>
        </div>
    </td>
</tr>`;
    for (var key in paymentdata) {
        if (paymentdata.hasOwnProperty(key)) {
            htmlString += `
            <tr>
                <td colspan="4" style="width: 150px;text-align:right;padding-right: 16px;border: 1px solid black; padding-top: 8px;padding-bottom:8px">
                    <div style="text-transform:uppercase"><b>${key}</b> <br></div>
                </td>
                <td style="width: 50px; text-align:center;border: 1px solid black; padding-top: 8px;padding-bottom:8px">
                    <div>
                        <b><span class="size"> ${paymentdata[key]}</span></b><br>
                    </div>
                </td>
            </tr>
            <tbody>`;
        }
    }
    // Add the total row to the HTML string


    return htmlString

}

module.exports = cplaced;