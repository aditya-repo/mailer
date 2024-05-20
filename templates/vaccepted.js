const vaccepted = (itemdetails) => {
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
    </tr>
`;
    }


    return htmlString

}

module.exports = vaccepted;