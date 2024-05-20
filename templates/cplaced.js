const cplaced = (itemdetails, paymentdata) => {
    // console.log(data);
    // return
    // Sample data
    // data = [
    //     { itemName: "PANNER BUTTER MASALA COMBO", quantity: 1, price: 200 }
    //     // Add more items as needed
    // ];

    // Initialize the HTML string with the template
    var htmlString = `
<tbody>
    <tr>
        <td style="width: 20px; text-align: center; height: 28px;">
            <b>SL. No</b>.<br>
        </td>
        <td style="width: 200px; text-align:center">
            <div><b>ITEMS</b><br></div>
        </td>
        <td style="width: 30px;text-align:center">
            <div><b>QTY</b><br></div>
        </td>
        <td style="width: 20px; text-align:center">
            <div><b>UNIT PRICE</b><br></div>
        </td>
        <td style="width: 50px; text-align:center">
            <div><b>TOTAL</b><br></div>
        </td>
    </tr>
`;

    // Use a loop to add items dynamically
    for (var i = 0; i < itemdetails.length; i++) {

        htmlString += `
    <tr>
        <td style="width: 20px; text-align: center; height: 28px;">
            <div>${i + 1}<br></div>
        </td>
        <td style="width: 200px;padding-left:16px">
            <div>${itemdetails[i].itemname}<br></div>
        </td>
        <td style="width: 30px; text-align:center">
            <div>${itemdetails[i].quantity}<br></div>
        </td>
        <td style="width: 30px; text-align:center">
            <div>${itemdetails[i].price}<br></div>
        </td>
        <td style="width: 30px; text-align:center">
            <div>${itemdetails[i].quantity * itemdetails[i].price}<br></div>
        </td>
    </tr>
`;
    }

    htmlString += `
<tr>
    <td>
        <div><br></div>
    </td>
    <td colspan="3" style="width: 150px;text-align:right;padding-right: 16px">
        <div><b>DELIVERY CHARGE</b> <br></div>
    </td>
    <td style="width: 50px; text-align:center">
        <div>
            <b><span class="size" style="font-size:12px;color:green"> FREE</span></b><br>
        </div>
    </td>
</tr>`;
    for (var key in paymentdata) {
        if (paymentdata.hasOwnProperty(key)) {
            htmlString += `
            <tr>
                <td>
                    <div><br></div>
                </td>
                <td colspan="3" style="width: 150px;text-align:right;padding-right: 16px">
                    <div style="text-transform:uppercase;font-size:12px"><b>${key}</b> <br></div>
                </td>
                <td style="width: 50px; text-align:center">
                    <div>
                        <b><span class="size" style="font-size:16px;font-size:12px"> ${paymentdata[key]}</span></b><br>
                    </div>
                </td>
            </tr>`;
        }
    }
    // Add the total row to the HTML string


    return htmlString

}

module.exports = cplaced;